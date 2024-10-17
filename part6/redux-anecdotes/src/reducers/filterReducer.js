
const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload.content
      default:
        return state
    }
}

export const filterHandler = (content) => {
    return {
        type: 'SET_FILTER',
        payload: { content }
    }
}  

export default filterReducer