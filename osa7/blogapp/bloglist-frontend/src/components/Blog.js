import React from 'react'
import blogService from '../services/blogs'
import CommentForm from '../components/CommentForm'



const Blog = ({ blog, updateBlogs }) => {

    const addLike = async () => {
        const blogObject = blog
        blogObject.likes = blogObject.likes + 1
        await blogService.update(blogObject, blogObject.id)
        updateBlogs()
    }

    /* const deleteBlog = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
            updateBlogs()
        }
    } */

    return (
        <>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes<button onClick={() => addLike()}>like</button></div>
            <div>added by {blog.author}</div>
            <h2>Comments</h2>
            <CommentForm id={blog.id} />
            <ul>
                {blog.comments.map(c =>
                    // Better way to do this?
                    <li key={Math.random() * 10000}>{c}</li>
                )}
            </ul>
        </>
    )}

export default Blog
