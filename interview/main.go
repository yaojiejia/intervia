package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/yaojiejia/intervia/interview/lib/db"
	"github.com/yaojiejia/intervia/interview/routers"
)

func main() {
	db.Connect()
	defer db.Disconnect()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/startinterview", routers.CreateInterview)
	fmt.Println("starting websocket at 4000")
	http.ListenAndServe(":4000", r)

}
