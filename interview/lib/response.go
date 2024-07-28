package lib

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/yaojiejia/intervia/interview/lib/db"
)

type Session struct {
	SessionID   string
	UserID      string
	CreatedTime time.Time
}

func NewSession(userID string) (string, error) {
	session := &Session{
		SessionID:   uuid.New().String(),
		UserID:      userID,
		CreatedTime: time.Now(),
	}
	collection := db.Client.Database("intervia").Collection("session")
	if _, err := collection.InsertOne(context.TODO(), session); err != nil {
		return "error", err
	}

	return string(session.SessionID), nil

}
