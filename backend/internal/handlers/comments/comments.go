package comments

import (
	"context"
	"encoding/json"
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"
)

func CommentCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		post := r.Context().Value("post").(*models.Post)
		db := database.GetDb()

		var comment *models.Comment
		err := db.Model(&post).Association("Comments").Find(&comment, 1)

		if err != nil || comment.ID == 0 {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		ctx := context.WithValue(r.Context(), "comment", comment)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

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
	content := r.FormValue("content")

	db := database.GetDb()
	db.Model(&post).Association("Comments").Append(&models.Comment{Content: content})
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	comment := r.Context().Value("comment").(*models.Comment)
	content := r.FormValue("content")

	db := database.GetDb()
	db.Model(&comment).Updates(models.Comment{Content: content})
}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	comment := r.Context().Value("comment").(*models.Comment)

	db := database.GetDb()
	db.Delete(&comment)
}
