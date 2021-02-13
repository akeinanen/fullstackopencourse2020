const notificationReducer = (state = null, action) => {
    switch(action.type) {
    case 'NOTIFICATION':
        state = action.data
        return state
    case 'CLEAR':
        state = null
        return state
    default:
        return state
    }
}

export default notificationReducer

