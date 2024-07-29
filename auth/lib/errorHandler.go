package lib

import "net/http"

func HttpError(res http.ResponseWriter, err error) {
	if err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
	}
}
