package lib

import (
	"encoding/json"
	"io"
)

func ParseRequestBody(body io.ReadCloser, v interface{}) error {
	defer body.Close()
	if err := json.NewDecoder(body).Decode(v); err != nil {
		return err
	}
	return nil
}
