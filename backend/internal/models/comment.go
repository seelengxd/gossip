package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content string
	PostID  uint
	Post    Post
	User    User
	UserID  uint
}

type ApiComment struct {
	ID      uint    `json:"id"`
	Content string  `json:"content"`
	PostID  uint    `json:"post_id"`
	User    ApiUser `json:"user"`
}

func (comment *Comment) ToApiComment() *ApiComment {
	apiComment := ApiComment{}
	apiComment.ID = comment.ID
	apiComment.Content = comment.Content
	apiComment.PostID = comment.PostID
	apiComment.User = *comment.User.toApiUser()
	return &apiComment
}

func (comment *Comment) GetUserId() uint {
	return comment.User.ID
}
