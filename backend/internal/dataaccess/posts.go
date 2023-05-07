package posts

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func List(db *gorm.DB) (*[]models.Post, error) {
	posts := make([]models.Post, 0)
	db.Find(&posts)
	return &posts, nil
}

func Find(db *gorm.DB, id int) (*models.Post, error) {
	var post models.Post
	result := db.Model(&models.Post{}).Preload("Comments").First(&post, id)
	return &post, result.Error
}

func Create(db *gorm.DB, post *models.Post) {
	db.Create(&post)
}

func Update(db *gorm.DB, post *models.Post, title string, content string) {
	db.Model(post).Updates(models.Post{Title: title, Content: content})
}

func Destroy(db *gorm.DB, post *models.Post) {
	db.Delete(post)
}
