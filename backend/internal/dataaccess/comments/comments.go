package comments

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func Find(db *gorm.DB, id int) (*models.Comment, error) {
	var comment models.Comment

	result := db.Model(&models.Comment{}).First(&comment, id)

	return &comment, result.Error
}

func Create(db *gorm.DB, post *models.Post, content string) {
	db.Model(post).Association("Comments").Append(&models.Comment{Content: content})
}

func Update(db *gorm.DB, comment *models.Comment, content string) {
	db.Model(comment).Updates(models.Comment{Content: content})
}

func Destroy(db *gorm.DB, comment *models.Comment) {
	db.Delete(comment)
}
