export const filter = (value) => {
    return {
        type: 'FILTER',
        value: value
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.value
        default:
            return state
    }
}

export default filterReducer