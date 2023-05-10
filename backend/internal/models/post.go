package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string `json:"title"`
	Content  string `json:"content"`
	Comments []Comment
	UserID   uint
	User     User
}

type ApiMiniPost struct {
	ID      uint    `json:"id"`
	Title   string  `json:"title"`
	Content string  `json:"content"`
	User    ApiUser `json:"user"`
}

type ApiPost struct {
	ApiMiniPost
	Comments []ApiComment `json:"comments"`
}

func (post *Post) ToApiMiniPost() *ApiMiniPost {
	apiMiniPost := ApiMiniPost{}
	apiMiniPost.ID = post.ID
	apiMiniPost.Title = post.Title
	apiMiniPost.Content = post.Content
	apiMiniPost.User = *post.User.toApiUser()
	return &apiMiniPost
}

func (post *Post) ToApiPost() *ApiPost {
	apiPost := ApiPost{}
	apiPost.ID = post.ID
	apiPost.Title = post.Title
	apiPost.Content = post.Content
	apiPost.User = *post.User.toApiUser()

	apiComments := make([]ApiComment, 0, len(post.Comments))
	for _, comment := range post.Comments {
		apiComments = append(apiComments, *comment.ToApiComment())
	}

	apiPost.Comments = apiComments

	return &apiPost
}

func (post *Post) GetUserId() uint {
	return post.User.ID
}
