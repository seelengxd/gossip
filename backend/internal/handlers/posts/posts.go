package posts

import (
	"context"
	"encoding/json"
	"fmt"
	postsDb "gossip/internal/dataaccess"
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
		idParam := chi.URLParam(r, "postId")
		id, err := strconv.Atoi(idParam)

		if err != nil {
			fmt.Println(err)
			http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
			return
		}

		db := database.GetDb()
		post, err := postsDb.Find(db, id)

		if err != nil || post.ID == 0 {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		ctx := context.WithValue(r.Context(), "post", post)

		next.ServeHTTP(w, r.WithContext(ctx))
	})

}

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	db := database.GetDb()
	posts, _ := postsDb.List(db)

	json.NewEncoder(w).Encode(posts)
}

func HandleShow(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	json.NewEncoder(w).Encode(post)
}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	title := r.FormValue("title")
	content := r.FormValue("content")

	newPost := models.Post{Title: title, Content: content}

	db := database.GetDb()
	postsDb.Create(db, &newPost)

	json.NewEncoder(w).Encode(newPost)
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	title := r.FormValue("title")
	content := r.FormValue("content")

	db := database.GetDb()
	postsDb.Update(db, post, title, content)

}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	db := database.GetDb()

	postsDb.Destroy(db, post)
}
