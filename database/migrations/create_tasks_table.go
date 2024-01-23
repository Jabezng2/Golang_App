package migrations

import (
	"gorm.io/gorm"
	"time"
)

type Tasks struct {
	ID          uint      `gorm:"primary key;autoIncrement" json:"id"`
	Name        *string   `json:"name"`
	Description *string   `json:"description"`
	Date        time.Time `json:"date"`
	Priority    *string   `json:"priority"`
	Status      *string   `json:"status"`
}

func MigrateTasks(db *gorm.DB) error {
	err := db.AutoMigrate(&Tasks{})
	return err
}
