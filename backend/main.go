package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	apiRouter := chi.NewRouter()

	apiRouter.Get("/posts", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Get all posts\n")
	})

	apiRouter.Post("/posts", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Create a post")
	})

	apiRouter.Get("/posts/{id}", func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		if id, err := strconv.Atoi(idParam); err == nil {
			fmt.Fprintf(w, "Get a post with id %d", id)
		} else {
			fmt.Fprintf(w, "Invalid id: %s", idParam)
		}
	})

	apiRouter.Put("/posts/{id}", func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		if id, err := strconv.Atoi(idParam); err == nil {
			fmt.Fprintf(w, "Update a post with id %d", id)
		} else {
			fmt.Fprintf(w, "Invalid id: %s", idParam)
		}
	})

	apiRouter.Delete("/posts/{id}", func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		if id, err := strconv.Atoi(idParam); err == nil {
			fmt.Fprintf(w, "Delete a post with id %d", id)
		} else {
			fmt.Fprintf(w, "Invalid id: %s", idParam)
		}
	})

	// Mounting API Sub Router on main router
	r.Mount("/api", apiRouter)

	http.ListenAndServe(":3000", r)
}
