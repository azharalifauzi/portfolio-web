package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)


func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err.Error())
	}

	router := gin.Default()
	router.Static("/images", "./images")
	router.GET("/", home)

	apiv1 := router.Group("/api/v1")
	apiv1.POST("/upload", uploadFile)
	apiv1.PUT("/upload/update", updateFile)
	apiv1.DELETE("/upload/delete", deleteFile)
	apiv1.DELETE("/upload/delete/many", deleteMany)

	router.Run()
}

func home(c *gin.Context) {
	file, err := ioutil.ReadFile("./index.html")

	if err != nil {
		c.JSON(500, "Oops something went wrong")
		return
	}

	c.Data(200, "text/html; charset=utf-8", file)
}

func uploadFile(c *gin.Context) {
	fileName := c.PostForm("fileName")

	file, err := c.FormFile("file")

	if err != nil {
		c.JSON(400, gin.H{"message": "file is required"})
		return
	}

	splittedString := strings.Split(strings.TrimSpace(file.Filename), " ")
	slug := strings.Join(splittedString, "-")

	path := fmt.Sprintf("images/%s-%s-%s", fileName, uuid.New().String(), slug)

	err = c.SaveUploadedFile(file, path)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error upload file"})
		return
	}

	res := gin.H{
		"path": path,
		"message": "success upload file",
	}

	c.JSON(200, res)
}

func updateFile(c *gin.Context) {
	fileUrl := c.PostForm("url")
	fileName := c.PostForm("fileName")

	err := os.Remove(fileUrl)

	if err != nil {
		c.JSON(500, gin.H{"message": "failed to delete the previous image"})
		log.Print(err)
		return
	}

	file, err := c.FormFile("file")

	if err != nil {
		c.JSON(400, gin.H{"message": "file is required"})
		return
	}

	splittedString := strings.Split(strings.TrimSpace(file.Filename), " ")
	slug := strings.Join(splittedString, "-")

	path := fmt.Sprintf("images/%s-%s-%s", fileName, uuid.New().String(), slug)

	err = c.SaveUploadedFile(file, path)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error update file"})
		return
	}

	res := gin.H{
		"path": path,
		"message": "success update file",
	}

	c.JSON(200, res)
}

func deleteFile(c *gin.Context) {
	type deleteStruct struct {
		Url string `binding:"required" json:"url"`
	}

	var body deleteStruct

	err := c.ShouldBindJSON(&body)

	if err != nil {
		c.JSON(400, gin.H{"message": "missing url field"})
		return
	}

	fmt.Println(body.Url)

	err = os.Remove(body.Url)

	if err != nil {
		c.JSON(500, gin.H{"message": "failed to delete the previous image"})
		log.Print(err)
		return
	}

	res := gin.H{
		"message": "success delete file",
	}

	c.JSON(204, res)
}

func deleteMany(c *gin.Context) {
	type deleteManyStruct struct {
		Urls []string `json:"urls" binding:"required"`
	}

	var input deleteManyStruct

	err := c.ShouldBindJSON(&input)

	if err != nil {
		c.JSON(400, gin.H{"message": "missing url field"})
		return
	}

	for _, url := range input.Urls {
		err = os.Remove(url)
		if err != nil {
			c.JSON(500, gin.H{"message": "failed to delete the previous image"})
			log.Print(err)
			return
		}
	}

	res := gin.H{
		"message": "success delete files",
	}

	c.JSON(204, res)
}