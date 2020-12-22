import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
    const [showAll, setShowAll] = useState(false)

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

    const buttonText = showAll ? 'show less' : 'show more'

    const blogState = showAll ?
        <div className="blogObject">
            {blog.title}<button onClick={() => setShowAll(!showAll)}>{buttonText}</button>
            <li>{blog.url}</li>
            <li id="likes">{blog.likes}<button onClick={addLike}>like</button></li>
            <li>{blog.author}</li>
            <button onClick={deleteBlog}>remove</button>
        </div>
        :
        <>
            {blog.title}<button onClick={() => setShowAll(!showAll)}>{buttonText}</button>
        </>

    return (
        <ul className="blogList">
            {blogState}
        </ul>
    )}

export default Blog
