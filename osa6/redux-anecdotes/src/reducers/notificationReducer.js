// timeout variable must be declared in the global scope
let timeout = null

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            notification: text
        })

        if(timeout != null) {
            clearTimeout(timeout)
            timeout = null
        } 
        const timeoutFunction = () => {
        timeout = setTimeout(() => {
                dispatch({
                    type: 'CLEAR_NOTIFICATION'
                })
            }, time)
        }
        timeoutFunction()
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer;
