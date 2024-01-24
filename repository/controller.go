package repository

import (
	"github.com/Jabezng2/Golang_App/database/migrations"
	"github.com/Jabezng2/Golang_App/database/models"
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

func ValidateStruct(task models.Task) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(task)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

func (r *Repository) GetTasks(context *fiber.Ctx) error {
	db := r.DB
	model := db.Model(&migrations.Tasks{})

	pg := paginate.New(&paginate.Config{
		DefaultSize:        20,
		CustomParamEnabled: true,
	})

	page := pg.With(model).Request(context.Request()).Response(&[]migrations.Tasks{})

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"data": page,
	})
	return nil
}

// funky
func (r *Repository) GetTaskByID(context *fiber.Ctx) error {
	id := context.Params("id")
	taskModel := &migrations.Tasks{}
	// usual error checking if id is empty
	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "ID cannot be empty"})
		return nil
	}

	err := r.DB.Where("id = ?", id).First(taskModel).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get the task"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status": "success", "message": "task has been fetched successfully", "data": taskModel})
	return nil
}

func (r *Repository) CreateTask(context *fiber.Ctx) error {
	task := models.Task{}
	err := context.BodyParser(&task)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Request failed"})

		return err
	}
	errors := ValidateStruct(task)
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	if err := r.DB.Create(&task).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Could create task", "data": err})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "task has been added successfully", "data": task})

	return nil
}

func (r *Repository) UpdateTask(context *fiber.Ctx) error {
	task := models.Task{}
	err := context.BodyParser(&task)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Request failed"})

		return err
	}
	errors := ValidateStruct(task)
	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := r.DB
	id := context.Params("id") // get the id from the req params

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "ID cannot be empty"})
		return nil
	}

	// Did not manage to find the ID
	if db.Model(&task).Where("id = ?", id).Updates(&task).RowsAffected == 0 {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get task"})
		return nil
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status": "success", "message": "task has been updated successfully"})
	return nil
}

func (r *Repository) DeleteTask(context *fiber.Ctx) error {
	taskModel := migrations.Tasks{}
	id := context.Params("id")
	// usual error checking if id is empty
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message": "ID cannot be empty"})
		return nil
	}

	err := r.DB.Delete(taskModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not delete task"})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"status": "success", "message": "task has been deleted successfully"})
	return nil
}
