const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

  blogsRouter.get('/', async (request, response) => {
    blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.get('/:id', async (request, response, next) => {
    blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
  })

  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
      
    response.status(201).json(savedBlog.toJSON())
  })

  blogsRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
 
    blog.comments.push(request.body.comment)
    savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if(decodedToken.id === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    } else {
      response.status(401).json({ error: 'You can only delete blogs of your own' })
    }
  })

  blogsRouter.put('/:id', async (request, response) => {

    blog = {
      likes: request.body.likes
    }

    updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
      response.status(204).json(updatedBlog)

  })

module.exports = blogsRouter