package auth

import (
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"

	"github.com/gorilla/sessions"
)

var (
	key   = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

func RequireLogin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, _ := store.Get(r, "session-cookie")
		userId, ok := session.Values["user"]

		if !ok {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		db := database.GetDb()

		user := models.User{}
		result := db.Model(&models.User{}).First(&user, userId)

		if result.Error != nil || user.ID == 0 {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})

}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-cookie")

	username := r.FormValue("username")
	password := r.FormValue("password")

	db := database.GetDb()

	user := models.User{}
	result := db.Model(&models.User{}).Where(map[string]interface{}{"username": username}).First(&user)

	if result.Error != nil || user.ID == 0 || user.Password != password {
		http.Error(w, "incorrect username or password", http.StatusUnauthorized)
		return
	}

	session.Values["user"] = user.ID
	session.Save(r, w)
}

func HandleLogout(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-cookie")
	delete(session.Values, "user")
	session.Save(r, w)

}

func HandleSignup(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-cookie")

	username := r.FormValue("username")
	password := r.FormValue("password")

	db := database.GetDb()

	newUser := models.User{Username: username, Password: password}
	result := db.Create(&newUser)

	if result.Error != nil {
		http.Error(w, "username already exists", http.StatusConflict)
		return
	}

	session.Values["user"] = newUser.ID
	session.Save(r, w)
}
