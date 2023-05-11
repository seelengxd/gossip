package tags

import (
	"context"
	"encoding/json"
	"gossip/internal/dataaccess/tags"
	tagsDB "gossip/internal/dataaccess/tags"
	"gossip/internal/database"
	"gossip/internal/models"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

func TagCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		id, err := strconv.Atoi(idParam)

		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
			return
		}

		db := database.GetDb()
		tag, err := tagsDB.Find(db, id)

		if err != nil || tag.ID == 0 {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		ctx := context.WithValue(r.Context(), "tag", tag)

		next.ServeHTTP(w, r.WithContext(ctx))

	})
}

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	db := database.GetDb()
	tags, _ := tagsDB.Index(db)

	json.NewEncoder(w).Encode(tags)

}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	db := database.GetDb()

	name := r.FormValue("name")
	colour := r.FormValue("colour")
	newTag := models.Tag{Name: name, Colour: colour}

	err := tags.Create(db, &newTag)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(newTag)

}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	tag := r.Context().Value("tag").(*models.Tag)

	db := database.GetDb()
	name := r.FormValue("name")
	colour := r.FormValue("colour")

	tagsDB.Update(db, tag, name, colour)
}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	tag := r.Context().Value("tag").(*models.Tag)

	db := database.GetDb()
	tagsDB.Destroy(db, tag)
}
