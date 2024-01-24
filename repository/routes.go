package repository

import (
	"github.com/gofiber/fiber/v2"
)

func (repo *Repository) SetupRoutes(app *fiber.App) {
	app.Static("/", "./client/public")
	api := app.Group("/api")

	// Endpoints
	api.Get("/tasks", repo.GetTasks)
	api.Get("/tasks/:id", repo.GetTaskByID)
	api.Post("/tasks", repo.CreateTask)
	api.Patch("/tasks/:id", repo.UpdateTask)
	api.Delete("/tasks/:id", repo.DeleteTask)
}
