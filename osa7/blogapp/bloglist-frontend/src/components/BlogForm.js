import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>Add new blog</h2>
        title:<input id="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value) } />
            <br />
        author:<input id="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value) } />
            <br />
        url:<input id="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value) } />
            <button id="addBlog" type="submit">Add</button>
        </form>
    )}

export default BlogForm