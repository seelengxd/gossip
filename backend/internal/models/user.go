package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string `json:"-"`
	Posts    []Post
	Comments []Comment
}

type ApiUser struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}
