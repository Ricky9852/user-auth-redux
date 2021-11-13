const userInitialState = {
    isLoading: true,
    data: {},
    errors: {}
}

export const userReducer = ( state = userInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_USER': {
            return {...state}
        }
        case 'GET_USER': {
            return {...state, data: {...action.payload}}
        }
        default: {
            return {...state}
        }
    }
}

const initialIsLoggedIn = false

export const loggedReducer = (state = initialIsLoggedIn, action) => {
    switch(action.type) {
        case 'LOGGED': {
            if(localStorage.getItem('token')) {
                return true
            }else {
                return false
            }
        }
        default: {
            return state
        }
    }
}