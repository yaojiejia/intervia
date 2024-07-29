package routers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/yaojiejia/intervia/auth/lib"
	"github.com/yaojiejia/intervia/auth/lib/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}

type UserCredential struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var expireTime = time.Now().Add(5 * time.Minute)

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
	err := lib.ParseRequestBody(req.Body, &credentials)

	lib.HttpError(res, err)

	collection := db.Client.Database("intervia").Collection("user")

	filter := bson.D{{Key: "username", Value: credentials.Username}}

	var user User
	er := collection.FindOne(context.TODO(), filter).Decode(&user)

	lib.HttpError(res, er)

	if user.Password != credentials.Password {
		res.Write([]byte("Wrong password"))
		return
	}

	tokenString, e := lib.GenerateJWT(user.ID.Hex(), user.Username)

	lib.HttpError(res, e)

	http.SetCookie(res, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expireTime,
	})

	res.Write([]byte("Login successful!"))
}

func Logout(res http.ResponseWriter, req *http.Request) {
	http.SetCookie(res, &http.Cookie{
		Name:    "token",
		Value:   "",
		Expires: time.Now().Add(-1 * time.Hour),
	})

	res.Write([]byte("Logged Out!"))
}
