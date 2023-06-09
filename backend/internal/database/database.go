package database

import (
	"gossip/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var globalDb *gorm.DB

func SetupDb() {
	// dsn := "host=localhost user=gossip password= dbname=gossip port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	dsn := "host=db user=postgres password=postgres dbname=gossip port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Error opening the database.")
	}
	db.AutoMigrate(&models.Post{})
	db.AutoMigrate(&models.Comment{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Tag{})

	globalDb = db
}

func GetDb() *gorm.DB {
	if globalDb == nil {
		SetupDb()
	}
	return globalDb
}
