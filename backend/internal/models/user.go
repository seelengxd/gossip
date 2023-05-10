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

func (user *User) toApiUser() *ApiUser {
	return &ApiUser{ID: user.ID, Username: user.Username}
}

type UserIDGetter interface {
	GetUserId() uint
}
