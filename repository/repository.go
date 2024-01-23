package repository

import (
	"gorm.io/gorm"
)

// Gorm as object relational mapper for Postgres db
type Repository struct {
	DB *gorm.DB
}
