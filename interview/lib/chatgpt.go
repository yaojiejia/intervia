package lib

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/go-resty/resty/v2"
)

type OpenAIResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func GenerateGPTResponse(prompt string) (string, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	fmt.Println(apiKey)
	client := resty.New()
	requestBody := map[string]interface{}{
		"model": "gpt-3.5-turbo",
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
		"max_tokens": 100,
	}

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("Authorization", "Bearer "+apiKey).
		SetBody(requestBody).
		Post("https://api.openai.com/v1/chat/completions")

	if err != nil {
		return "", fmt.Errorf("error making request to openai: %v", err)
	}

	if resp.StatusCode() != http.StatusOK {
		return "", fmt.Errorf("error: %v", resp.String())
	}

	var openAIResponse OpenAIResponse

	if err := json.Unmarshal(resp.Body(), &openAIResponse); err != nil {
		return "", fmt.Errorf("error reading json from openai: %v", err)
	}

	if len(openAIResponse.Choices) == 0 {
		return "", fmt.Errorf("no responses from openai")
	}

	return openAIResponse.Choices[0].Message.Content, nil
}
