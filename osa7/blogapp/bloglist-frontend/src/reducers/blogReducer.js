const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'UPDATE_BLOGS':
        return action.data
    case 'NEW_BLOG':
        state.push(action.data)
        return state
    case 'ADD_LIKE':
        state[state.findIndex(b => b.id === action.data)].likes = 3
        return state
    default:
        return state
    }
}

export const addBlog = (data) => {
    return {
        type: 'NEW_BLOG',
        data: data,
    }

}

export default blogReducer