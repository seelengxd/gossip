package routes

import (
	"gossip/internal/handlers/auth"

	"github.com/go-chi/chi/v5"
)

func AddAuthRoutes(r chi.Router) {
	r.Post("/login", auth.HandleLogin)
	r.Post("/logout", auth.HandleLogout)
	r.Post("/signup", auth.HandleSignup)
}
