package routes

import (
	"gossip/internal/handlers/posts"

	"github.com/go-chi/chi/v5"
)

func AddPostRoutes(r chi.Router) {
	r.Get("/posts", posts.HandleIndex)

	r.Get("/posts/{id}", posts.HandleShow)

	r.Post("/posts", posts.HandleCreate)

	r.Put("/posts/{id}", posts.HandleUpdate)

	r.Delete("/posts/{id}", posts.HandleDestroy)
}
