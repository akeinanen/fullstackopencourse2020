import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes-a.likes) )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem('LoggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setNotification({ message: 'Wrong username or password', type: 'error' })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('LoggedBlogAppUser')
        setUser(null)
    }

    const addBlog = async (createBlog) => {
        await blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(createBlog)
        setBlogs(blogs.concat(returnedBlog))
        setNotification({ message: `${createBlog.title} by ${createBlog.author} added!`, type: 'correct' })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const updateBlogs = () => {
    // Get data from server
        console.log('called')
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => b.likes-a.likes))
        )
    }

    const blogFormRef = useRef()

    if (user === null) {
        return (
            <div>
                <h2>Login</h2>
                {notification !== null && <Notification message={notification.message} type={notification.type} />}
                <form id="loginForm" onSubmit={handleLogin}>
                    <div>
          username:
                        <input id="username" value={username} onChange={({ target }) => setUsername(target.value) } ></input>
                    </div>
                    <div>
          password:
                        <input id="password" value={password} onChange={({ target }) => setPassword(target.value )} ></input>
                    </div>
                    <button id="loginButton" type="submit">Login</button>
                </form>
            </div>
        )}
    return (
        <div>
            <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
            {notification !== null && <Notification message={notification.message} type={notification.type} />}

            <Togglable buttonText={'Add new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <h2>blogs</h2>
            <div id="blogs">
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs}/>
                )}
            </div>
        </div>
    )
}

export default App