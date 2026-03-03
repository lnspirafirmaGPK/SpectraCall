package auth

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
)

type ProblemDetails struct {
	Type      string `json:"type"`
	Title     string `json:"title"`
	Status    int    `json:"status"`
	Detail    string `json:"detail"`
	RequestID string `json:"request_id"`
}

func WriteProblem(w http.ResponseWriter, r *http.Request, status int, title, detail string) {
	requestID := r.Header.Get("X-Request-Id")
	if requestID == "" {
		requestID = uuid.NewString()
	}
	payload := ProblemDetails{
		Type:      "about:blank",
		Title:     title,
		Status:    status,
		Detail:    detail,
		RequestID: requestID,
	}
	w.Header().Set("Content-Type", "application/problem+json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
