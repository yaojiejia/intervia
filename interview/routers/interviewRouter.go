package routers

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var roundCounter = 0

func CreateInterview(res http.ResponseWriter, req *http.Request) {
	ws, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer ws.Close()
	//handle websocket incoming message

	for {
		if roundCounter == 0 {
			//TODO Implement starting round logic
			//Welcome to the interview, tell me more about yourself
			er := sendGPTResponse(ws, serverMsg)
			if er != nil {
				log.Printf("error sending msg: %s", er)
			}
			roundCounter++
		}

		if roundCounter == 3 {
			//TODO Implement 2nd round logic
			//Move on to the technical interview part
			er := sendGPTResponse(ws, serverMsg)
			if er != nil {
				log.Printf("error sending msg: %s", er)
			}
			roundCounter++
		}
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Printf("websocket read error: %v", err)
			break
		}

		userMsg := string(msg)
		log.Printf("user message: %s", userMsg)

		er := sendGPTResponse(ws, userMsg)
		if er != nil {
			log.Printf("error sending msg: %s", er)
		}

	}
}

func sendGPTResponse(ws *websocket.Conn, userMsg string) error {
	gptMsg := GetGPTResponse(userMsg)

	err := ws.WriteMessage(websocket.TextMessage, []byte(gptMsg))
	if err != nil {
		log.Printf("websocket write error %s", err)
		return err
	}
	return nil
}
