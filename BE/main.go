package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	api := r.Group("/api")
	{
		tasks := api.Group("/tasks")
		{
			tasks.GET("", getTasks)
			tasks.POST("", createTask)
			tasks.PUT("/:id", updateTask)
			tasks.DELETE("/:id", deleteTask)
		}
	}

	r.Run()
}
