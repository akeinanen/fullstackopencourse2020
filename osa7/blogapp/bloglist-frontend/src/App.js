import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            dispatch({
                type: 'UPDATE_BLOGS',
                data: blogs.sort((a,b) => b.likes-a.likes)
            })
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'ADD_USER',
                data: user
            })
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
            dispatch({
                type: 'ADD_USER',
                data: user
            })
            setUsername('')
            setPassword('')
        } catch {
            dispatch({
                type: 'NOTIFICATION',
                data: { message: 'Wrong username or password', type: 'error' }
            })
            setTimeout(() => {
                dispatch({ type: 'CLEAR' })
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('LoggedBlogAppUser')
        dispatch({
            type: 'CLEAR_USER'
        })
    }

    const addBlog = async (createBlog) => {
        await blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(createBlog)
        dispatch({
            type: 'NEW_BLOG',
            data: returnedBlog
        })

        dispatch({
            type: 'NOTIFICATION',
            data: { message: `${createBlog.title} by ${createBlog.author} added!`, type: 'correct' }
        })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 5000)
    }

    const updateBlogs = async () => {
    // Get data from server
        const blogObject = await blogService.getAll()
        dispatch({
            type: 'UPDATE_BLOGS',
            data: blogObject.sort((a,b) => b.likes-a.likes)
        })
    }

    // ROUTES

    const Blogs = () => (
        <>
            <Togglable buttonText={'Add new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <div id="blogs">
                <ul className="blogList">
                    {blogs.map(blog =>
                        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
                    )}
                </ul>
            </div>
        </>
    )

    const UsersPage = ({ blogs }) => (
        <>
            <Users blogs={blogs} />
        </>
    )

    const SingleBlog = ({ blogs }) => {
        const id = useParams().id
        const blog = blogs.find(b => b.id === id)

        // Run after blogs are loaded from backend
        if(!blog) {
            return null
        }
        return(
            <>
                <Blog blog={blog} updateBlogs={updateBlogs} />
            </>
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
        <Router>
            <nav>
                <ul>
                    <li><Link to='/'>Blogs</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                    <li>{user.name} logged in <button onClick={handleLogout}>Log out</button></li>
                </ul>
            </nav>
            <h2>Blog app</h2>
            {notification !== null && <Notification message={notification.message} type={notification.type} />}

            <Switch>
                <Route path="/blogs/:id">
                    <SingleBlog blogs={blogs} />
                </Route>
                <Route path="/users">
                    <UsersPage blogs={blogs} />
                </Route>
                <Route path="/">
                    <Blogs />
                </Route>
            </Switch>
        </Router>
    )
}

export default App