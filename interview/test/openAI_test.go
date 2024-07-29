package test

import (
	"fmt"
	"testing"

	"github.com/yaojiejia/intervia/interview/lib"
)

func TestAPI(t *testing.T) {
	prompt := "quick introduction on yourself, must be over 20 words"
	resp, err := lib.GenerateGPTResponse(prompt)
	if err != nil {
		t.Fatalf("Failed to generate GPT response: %v", err)
	}

	fmt.Println("ChatGPT Response:", resp)

	want := len(resp)
	if want <= 50 {
		t.Errorf("Expected response length to be greater than 50, got %d", want)
	}
}
