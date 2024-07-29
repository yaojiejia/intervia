package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/yaojiejia/intervia/auth/lib/db"
	"github.com/yaojiejia/intervia/auth/routers"
)

func main() {
	db.Connect()
	defer db.Disconnect()
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/auth/register", routers.Register)
	r.Post("/auth/login", routers.Login)
	r.Post("/auth/logout", routers.Logout)
	fmt.Println("Server started at 3000")
	http.ListenAndServe(":3000", r)
}
