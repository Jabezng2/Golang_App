package models

type Task struct {
	Name        string `json:"name" validate:"required,min=10,max=50"`
	Description string `json:"description" validate:"required,min=5,max=100"`
	Date        string `json:"date" validate:"required"`
	Priority    string `json:"priority" validate:"required,min=3,max=40"`
	Status      string `json:"status" validate:"required,min=3,max=40"`
}
