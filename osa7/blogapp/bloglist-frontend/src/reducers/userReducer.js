const userReducer = (state = null, action) => {
    switch(action.type) {
    case 'ADD_USER':
        return action.data
    case 'CLEAR_USER':
        return null
    default:
        return state
    }
}

export default userReducer