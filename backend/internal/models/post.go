package models

import "gorm.io/gorm"

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
