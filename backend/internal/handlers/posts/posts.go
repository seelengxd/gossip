package posts

import (
	"context"
	"encoding/json"
	"fmt"
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

// Contexts, reference:
// https://github.com/go-chi/chi/blob/7f280968675bcc9f310008fc6b8abff0b923734c/_examples/rest/main.go#L128
func PostCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		id, err := strconv.Atoi(idParam)

		if err != nil {
			fmt.Println(err)
			http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
			return
		}

		db := database.GetDb()
		var post *models.Post

		result := db.Find(&post, id)
		if result.Error != nil || post.ID == 0 {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		fmt.Println(post)

		ctx := context.WithValue(r.Context(), "post", post)

		next.ServeHTTP(w, r.WithContext(ctx))
	})

}

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	db := database.GetDb()
	posts := make([]models.Post, 0)
	db.Find(&posts)

	json.NewEncoder(w).Encode(posts)
}

func HandleShow(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	json.NewEncoder(w).Encode(post)
}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	// r.ParseForm()  must be called before you do things with forms
	r.ParseForm()
	title := r.FormValue("title")
	content := r.FormValue("content")

	newPost := models.Post{Title: title, Content: content}

	db := database.GetDb()
	db.Create(&newPost)

	json.NewEncoder(w).Encode(newPost)
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	title := r.FormValue("title")
	content := r.FormValue("content")

	db := database.GetDb()
	db.Model(post).Updates(models.Post{Title: title, Content: content})

}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	db := database.GetDb()

	db.Delete(post)
}
