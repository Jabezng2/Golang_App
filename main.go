package main

import (
	"github.com/Jabezng2/Golang_App/bootstrap"
	"github.com/Jabezng2/Golang_App/repository"
	"github.com/gofiber/fiber/v2"
)

type Repository repository.Repository

func main() {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}
