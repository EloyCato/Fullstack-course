const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

/*
blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(Blog => {
      if (Blog) {
        response.json(Blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
*/
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

/*
blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Blog.findById(request.params.id)
    .then(Blog => {
      if (!Blog) {
        return response.status(404).end()
      }

      Blog.content = content
      Blog.important = important

      return Blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})
*/

module.exports = blogsRouter