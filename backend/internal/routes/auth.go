package routes

import (
	"gossip/internal/handlers/auth"

	"github.com/go-chi/chi/v5"
)

func AddAuthRoutes(r chi.Router) {
	r.Group(func(r chi.Router) {
		r.Use(auth.RequireLogin)
		r.Get("/logout", auth.HandleLogout)
	})
	r.Post("/login", auth.HandleLogin)

	r.Post("/signup", auth.HandleSignup)
}
