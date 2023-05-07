package main

import (
	"gossip/internal/database"
	"gossip/internal/router"
	"net/http"
)

func main() {
	r := router.Setup()

	database.SetupDb()

	http.ListenAndServe(":3000", r)
}
