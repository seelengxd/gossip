package auth

import (
	"context"
	"encoding/json"
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"

	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var (
	key   = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

func getApiUser(user models.User) models.ApiUser {
	apiUser := models.ApiUser{}
	// is there a less tedious way to copy structs...
	apiUser.ID = user.ID
	apiUser.Username = user.Username
	return apiUser
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func RetrieveSession(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("user").(*models.User)
	apiUser := getApiUser(*user)
	json.NewEncoder(w).Encode(apiUser)
}

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

		ctx := context.WithValue(r.Context(), "user", &user)

		next.ServeHTTP(w, r.WithContext(ctx))
	})

}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-cookie")

	username := r.FormValue("username")
	password := r.FormValue("password")

	db := database.GetDb()

	user := models.User{}
	result := db.Model(&models.User{}).Where(map[string]interface{}{"username": username}).First(&user)

	if result.Error != nil || user.ID == 0 || !checkPasswordHash(password, user.Password) {
		http.Error(w, "incorrect username or password", http.StatusUnauthorized)
		return
	}

	session.Values["user"] = user.ID
	session.Save(r, w)

	apiUser := getApiUser(user)

	json.NewEncoder(w).Encode(apiUser)
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

	if username == "" || password == "" {
		http.Error(w, "username and password cannot be empty", http.StatusUnauthorized)
		return
	}

	db := database.GetDb()

	hashedPassword, _ := hashPassword(password)
	newUser := models.User{Username: username, Password: hashedPassword}
	result := db.Create(&newUser)

	if result.Error != nil {
		http.Error(w, "username already exists", http.StatusConflict)
		return
	}

	session.Values["user"] = newUser.ID

	session.Save(r, w)

	apiUser := getApiUser(newUser)

	json.NewEncoder(w).Encode(apiUser)
}
