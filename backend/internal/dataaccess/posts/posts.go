package posts

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func List(db *gorm.DB) (*[]*models.ApiMiniPost, error) {
	posts := make([]*models.Post, 0)
	db.Model(&models.Post{}).Preload("User").Preload("Tags").Find(&posts)
	apiPosts := make([]*models.ApiMiniPost, 0, len(posts))

	for _, post := range posts {
		apiPosts = append(apiPosts, post.ToApiMiniPost())
	}

	return &apiPosts, nil
}

func Find(db *gorm.DB, id int) (*models.Post, error) {
	var post models.Post
	result := db.Model(&models.Post{}).Preload("Tags").Preload("Comments").Preload("User").Preload("Comments.User").First(&post, id)

	return &post, result.Error
}

func Create(db *gorm.DB, user *models.User, post *models.Post) {
	db.Model(user).Association("Posts").Append(post)
}

func Update(db *gorm.DB, post *models.Post, title string, content string) {
	db.Model(post).Updates(models.Post{Title: title, Content: content})
}

func Destroy(db *gorm.DB, post *models.Post) {
	// Todo: currently, deleted posts' comments are still there. figure out what to do with them
	db.Delete(post)
}

func AddTag(db *gorm.DB, post *models.Post, tag *models.Tag) error {
	return db.Model(post).Association("Tags").Append(tag)
}

func DeleteTag(db *gorm.DB, post *models.Post, tag *models.Tag) error {
	return db.Model(post).Association("Tags").Delete(tag)
}
