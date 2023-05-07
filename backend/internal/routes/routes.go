package routes

import (
	"github.com/go-chi/chi/v5"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		AddPostRoutes(r)
	}
}
