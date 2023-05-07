package main

import (
	"gossip/internal/router"
	"net/http"
)

func main() {
	r := router.Setup()

	http.ListenAndServe(":3000", r)
}
