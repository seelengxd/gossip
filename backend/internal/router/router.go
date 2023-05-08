package router

import (
	"gossip/internal/routes"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func Setup() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// https://github.com/go-chi/cors
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins: []string{"http://localhost:3001/*"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	apiRouter := chi.NewRouter()
	setUpRoutes(apiRouter)
	r.Mount("/api", apiRouter)

	return r
}

func setUpRoutes(r chi.Router) {
	r.Group(routes.GetRoutes())
}
