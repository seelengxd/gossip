package routes

import (
	"gossip/internal/handlers/comments"
	"gossip/internal/handlers/posts"

	"github.com/go-chi/chi/v5"
)

func AddCommentsRoutes(r chi.Router) {
	// Route - mount a subRouter along a pattern string
	r.Route("/posts/{postId}/comments", func(r chi.Router) {

		r.Use(posts.PostCtx)

		r.Get("/", comments.HandleIndex)
		r.Post("/", comments.HandleCreate)

		// Group is useful for which route runs what middleware
		r.Group(func(r chi.Router) {
			r.Use(comments.CommentCtx)
			r.Put("/{id}", comments.HandleUpdate)
			r.Delete("/{id}", comments.HandleDestroy)
			r.Get("/{id}", comments.HandleShow)
		})

	})
}
