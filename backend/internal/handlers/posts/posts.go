package posts

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
)

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get all posts\n")
}

func HandleShow(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	if id, err := strconv.Atoi(idParam); err == nil {
		fmt.Fprintf(w, "Get a post with id %d", id)
	} else {
		fmt.Fprintf(w, "Invalid id: %s", idParam)
	}
}

func HandleCreate(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Create a post")
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	if id, err := strconv.Atoi(idParam); err == nil {
		fmt.Fprintf(w, "Update a post with id %d", id)
	} else {
		fmt.Fprintf(w, "Invalid id: %s", idParam)
	}
}

func HandleDestroy(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	if id, err := strconv.Atoi(idParam); err == nil {
		fmt.Fprintf(w, "Delete a post with id %d", id)
	} else {
		fmt.Fprintf(w, "Invalid id: %s", idParam)
	}
}
