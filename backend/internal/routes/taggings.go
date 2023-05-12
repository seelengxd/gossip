package routes

import (
	"gossip/internal/handlers/posts"
	"gossip/internal/handlers/taggings"
	"gossip/internal/handlers/tags"

	"github.com/go-chi/chi/v5"
)

func AddTaggingRoutes(r chi.Router) {
	r.Route("/taggings/{postId}/{tagId}", func(r chi.Router) {
		r.Use(posts.PostCtx)
		r.Use(tags.TagCtx)

		r.Post("/", taggings.HandleCreate)
		r.Delete("/", taggings.HandleDelete)
	})
}
