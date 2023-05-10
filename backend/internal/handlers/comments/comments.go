package comments

import (
	"context"
	"encoding/json"
	"gossip/internal/dataaccess/comments"
	"gossip/internal/database"
	"gossip/internal/handlers/auth"
	"gossip/internal/models"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

func CommentCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// post := r.Context().Value("post").(*models.Post)
		db := database.GetDb()

		idParam := chi.URLParam(r, "id")
		id, err := strconv.Atoi(idParam)

		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
			return
		}

		comment, err := comments.Find(db, id)

		if err != nil || comment.ID == 0 {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		ctx := context.WithValue(r.Context(), "comment", comment)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

var CheckBelongsToUser = auth.GenerateCheckBelongsToUser[*models.Comment]("comment")

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	json.NewEncoder(w).Encode(post.Comments)
}

func HandleShow(w http.ResponseWriter, r *http.Request) {
	comment := r.Context().Value("comment").(*models.Comment)
	json.NewEncoder(w).Encode(comment)
}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	user := r.Context().Value("user").(*models.User)
	content := r.FormValue("content")

	db := database.GetDb()
	comments.Create(db, user, post, content)
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	comment := r.Context().Value("comment").(*models.Comment)
	content := r.FormValue("content")

	db := database.GetDb()
	comments.Update(db, comment, content)
}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	comment := r.Context().Value("comment").(*models.Comment)

	db := database.GetDb()
	comments.Destroy(db, comment)
}
