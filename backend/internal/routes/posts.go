package routes

import (
	"gossip/internal/handlers/auth"
	"gossip/internal/handlers/posts"

	"github.com/go-chi/chi/v5"
)

func AddPostRoutes(r chi.Router) {
	r.Route("/posts", func(r chi.Router) {
		r.Get("/", posts.HandleIndex)

		r.Group(func(r chi.Router) {
			r.Use(posts.PostCtx)
			r.Get("/{postId}", posts.HandleShow)
		})

		r.Group(func(r chi.Router) {
			r.Use(auth.RequireLogin)
			r.Post("/", posts.HandleCreate)

			r.Group(func(r chi.Router) {
				r.Use(posts.PostCtx)
				r.Put("/{postId}", posts.HandleUpdate)
				r.Delete("/{postId}", posts.HandleDestroy)
			})

		})

	})
}
