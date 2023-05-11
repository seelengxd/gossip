package models

import (
	"fmt"
	"regexp"

	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	Name   string `gorm:"unique;"`
	Colour string
	Posts  []Post `gorm:"many2many:post_tags;"`
}

func (t *Tag) BeforeSave(tx *gorm.DB) (err error) {
	colourFormat := regexp.MustCompile(`^#[0-9a-f]{6}$`)
	if !colourFormat.Match([]byte(t.Colour)) {
		err = fmt.Errorf("colour %q is not of the right format", t.Colour)
	}
	return
}

type ApiTag struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	Colour string `json:"colour"`
}
