package comments

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func Find(db *gorm.DB, id int) (*models.Comment, error) {
	var comment models.Comment

	result := db.Model(&models.Comment{}).Preload("User").First(&comment, id)

	return &comment, result.Error
}

func Create(db *gorm.DB, user *models.User, post *models.Post, content string) {
	comment := models.Comment{Content: content}
	db.Model(post).Association("Comments").Append(&comment)
	db.Model(user).Association("Comments").Append(&comment)
}

func Update(db *gorm.DB, comment *models.Comment, content string) {
	db.Model(comment).Updates(models.Comment{Content: content})
}

func Destroy(db *gorm.DB, comment *models.Comment) {
	db.Delete(comment)
}
