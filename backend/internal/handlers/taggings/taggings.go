package taggings

import (
	"gossip/internal/dataaccess/posts"
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"
)

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	tag := r.Context().Value("tag").(*models.Tag)

	db := database.GetDb()
	err := posts.AddTag(db, post, tag)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func HandleDelete(w http.ResponseWriter, r *http.Request) {
	post := r.Context().Value("post").(*models.Post)
	tag := r.Context().Value("tag").(*models.Tag)

	db := database.GetDb()
	err := posts.DeleteTag(db, post, tag)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}
