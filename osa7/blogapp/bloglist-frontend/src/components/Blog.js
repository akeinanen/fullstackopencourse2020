import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateBlogs }) => {

    const addLike = async () => {
        const blogObject = blog
        blogObject.likes = blogObject.likes + 1
        await blogService.update(blogObject, blogObject.id)
        updateBlogs()
    }

    const deleteBlog = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
            updateBlogs()
        }
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes<button onClick={() => addLike()}>like</button></div>
            <div>added by {blog.author}</div>
        </>
    )}

export default Blog
