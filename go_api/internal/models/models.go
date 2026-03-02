package models

type Alert struct {
	AlertID   string `json:"alert_id"`
	Type      string `json:"type"`
	Severity  string `json:"severity"`
	Status    string `json:"status"`
	DeptID    string `json:"dept_id"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
