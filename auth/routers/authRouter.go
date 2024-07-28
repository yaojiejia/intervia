package routers

import (
	"context"
	"log"
	"net/http"

	"github.com/yaojiejia/intervia/auth/lib"
	"github.com/yaojiejia/intervia/auth/lib/db"
	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserCredential struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Register(res http.ResponseWriter, req *http.Request) {
	var user User
	if err := lib.ParseRequestBody(req.Body, &user); err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}

	collection := db.Client.Database("intervia").Collection("user")
	if _, err := collection.InsertOne(context.TODO(), user); err != nil {
		log.Printf("Error inserting user: %v", err)
		http.Error(res, "Error creating user", http.StatusInternalServerError)
		return
	}

	res.Write([]byte("User created"))
}

func Login(res http.ResponseWriter, req *http.Request) {
	var credentials UserCredential
	if err := lib.ParseRequestBody(req.Body, &credentials); err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}

	collection := db.Client.Database("intervia").Collection("user")

	filter := bson.D{{Key: "username", Value: credentials.Username}}

	var result UserCredential
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
	}

	if result.Password != credentials.Password {
		res.Write([]byte("Wrong password"))
		return
	}
	res.Write([]byte("Login successful"))
}
