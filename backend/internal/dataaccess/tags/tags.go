package tags

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func Index(db *gorm.DB) (*[]*models.ApiTag, error) {
	tags := make([]*models.ApiTag, 0)
	result := db.Model(&models.Tag{}).Find(&tags)

	return &tags, result.Error
}

func Find(db *gorm.DB, id int) (*models.Tag, error) {
	var tag models.Tag
	result := db.Model(&models.Tag{}).First(&tag, id)
	return &tag, result.Error
}

func Create(db *gorm.DB, tag *models.Tag) error {
	result := db.Create(tag)
	return result.Error
}

func Update(db *gorm.DB, tag *models.Tag, name string, colour string) error {
	result := db.Model(tag).Updates(models.Tag{Name: name, Colour: colour})
	return result.Error
}

func Destroy(db *gorm.DB, tag *models.Tag) {
	db.Model(tag).Association("Posts").Clear()
	db.Unscoped().Delete(tag)
}
