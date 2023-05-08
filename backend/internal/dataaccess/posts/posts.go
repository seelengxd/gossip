package posts

import (
	"gossip/internal/models"

	"gorm.io/gorm"
)

func postToApiMiniPost(post *models.Post) *models.ApiMiniPost {
	apiMiniPost := models.ApiMiniPost{}
	apiMiniPost.ID = post.ID
	apiMiniPost.Title = post.Title
	apiMiniPost.Content = post.Content
	apiMiniPost.User = models.ApiUser{ID: post.User.ID, Username: post.User.Username}
	return &apiMiniPost
}

func List(db *gorm.DB) (*[]*models.ApiMiniPost, error) {
	posts := make([]*models.Post, 0)
	db.Model(&models.Post{}).Preload("User").Find(&posts)
	apiPosts := make([]*models.ApiMiniPost, 0, len(posts))

	for _, post := range posts {
		apiPosts = append(apiPosts, postToApiMiniPost(post))
	}

	return &apiPosts, nil
}

func Find(db *gorm.DB, id int) (*models.Post, error) {
	var post models.Post
	result := db.Model(&models.Post{}).Preload("Comments").First(&post, id)
	return &post, result.Error
}

func Create(db *gorm.DB, user *models.User, post *models.Post) {
	db.Model(user).Association("Posts").Append(post)
}

func Update(db *gorm.DB, post *models.Post, title string, content string) {
	db.Model(post).Updates(models.Post{Title: title, Content: content})
}

func Destroy(db *gorm.DB, post *models.Post) {
	db.Delete(post)
}
