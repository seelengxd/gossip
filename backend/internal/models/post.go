package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string `json:"title"`
	Content  string `json:"content"`
	Comments []Comment
	Tags     []Tag `gorm:"many2many:post_tags;"`
	UserID   uint
	User     User
}

type ApiMiniPost struct {
	ID      uint      `json:"id"`
	Title   string    `json:"title"`
	Content string    `json:"content"`
	User    ApiUser   `json:"user"`
	Tags    []*ApiTag `json:"tags"`
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

	apiTags := make([]*ApiTag, 0, len(post.Tags))
	for _, tag := range post.Tags {
		apiTags = append(apiTags, tag.ToApiTag())
	}

	apiMiniPost.Tags = apiTags

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

	apiTags := make([]*ApiTag, 0, len(post.Tags))
	for _, tag := range post.Tags {
		apiTags = append(apiTags, tag.ToApiTag())
	}

	apiPost.Tags = apiTags

	return &apiPost
}

func (post *Post) GetUserId() uint {
	return post.User.ID
}
