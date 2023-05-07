package routes

import (
	"gossip/internal/handlers/posts"

	"github.com/go-chi/chi/v5"
)

func AddPostRoutes(r chi.Router) {
	r.Route("/posts", func(r chi.Router) {
		r.Get("/", posts.HandleIndex)

		r.Post("/", posts.HandleCreate)

		r.Route("/{postId}", func(r chi.Router) {
			r.Use(posts.PostCtx)
			r.Get("/", posts.HandleShow)
			r.Put("/", posts.HandleUpdate)
			r.Delete("/", posts.HandleDestroy)

		})

	})
}
