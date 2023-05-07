package router

import (
	"gossip/internal/routes"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
)

func Setup() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	apiRouter := chi.NewRouter()
	setUpRoutes(apiRouter)
	r.Mount("/api", apiRouter)

	return r
}

func setUpRoutes(r chi.Router) {
	r.Group(routes.GetRoutes())
}
