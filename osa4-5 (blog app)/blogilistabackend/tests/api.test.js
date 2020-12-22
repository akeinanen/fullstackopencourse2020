const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('Login', async () => {
  const username = {
    "username": "root",
    "password": "salainen"
  }

  await api
    .post('/api/login').send(username)
    .expect(200)
})

test('Blogs returned correctly', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
}) 

test('Returned blogs identifyer is "id"', async () => {
    const response = await api.get('/api/blogs')
        expect(response.body.map(blog => blog.id)).toBeDefined()
})

test('Blog can be posted correctly', async () => {

    console.log( await helper.getToken())
    await api
        .post('/api/blogs').send(helper.newBlog)
        .set('Authorization', helper.getToken())
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length +1)
    expect(response.body[response.body.length -1].title).toEqual(helper.newBlog.title)
})

test('if keyvalue "likes" is not declared, give it value 0', async () => {

    await api
      .post('/api/blogs')
      .set('Authorization', helper.token)
      .send(helper.newBlog)
    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length -1].likes).toEqual(0)
        
})

test('Blog must have title and url', async () => {
    newBlog = {
        title: "JauzaTes",
        author: "String",
        likes: 2
      }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', helper.getToken())
        .expect(400)

})

test('Blogs can be deleted', async () => {
    let blogs = await api.get('/api/blogs')
    await api
        .delete(`/api/blogs/${blogs.body[0].id}`)
        .set('Authorization', helper.getToken())
        .expect(204)
})

test('likes can be edited', async () => {
    let blogs = await api.get('/api/blogs')
    await api.put(`/api/blogs/${blogs.body[0].id}`).send({likes: 18})
        .expect(204)
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({ username: { $ne: "Istay"} })
  
      const passwordHash = await bcrypt.hash('salainen', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'testitimo',
        name: 'Timo Testi',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'JauzaPasi',
          name: 'Pasi Jauza',
          password: 'salainen',
        }
        
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})

afterAll(() => {
    mongoose.connection.close()
})

