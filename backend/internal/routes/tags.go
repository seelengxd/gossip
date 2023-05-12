package routes

import (
	"gossip/internal/handlers/auth"
	"gossip/internal/handlers/tags"

	"github.com/go-chi/chi/v5"
)

func AddTagRoutes(r chi.Router) {
	r.Route("/tags", func(r chi.Router) {
		r.Use(auth.RequireLogin)

		r.Get("/", tags.HandleIndex)
		r.Post("/", tags.HandleCreate)

		r.Group(func(r chi.Router) {
			r.Use(tags.TagCtx)

			r.Put("/{tagId}", tags.HandleUpdate)
			r.Delete("/{tagId}", tags.HandleDestroy)
		})
	})
}
