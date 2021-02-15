import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

const CommentForm = ({ id }) => {
    const [newComment, setNewComment] = useState('')

    const dispatch = useDispatch()

    const addComment = async (event) => {
        event.preventDefault()
        blogService.addComment({ comment: newComment }, id)

        dispatch({
            type: 'ADD_COMMENT',
            data: { id: id, comment: newComment }
        })
        setNewComment('')
    }

    return (
        <form onSubmit={addComment}>
            <input id="comment" value={newComment} onChange={({ target }) => setNewComment(target.value)} />
            <button id="addComment" type="submit">add comment</button>
        </form>
    )
}

export default CommentForm