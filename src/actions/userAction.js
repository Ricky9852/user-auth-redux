import axios from 'axios';

export const startSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
                .then( (response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully created an account')
                        dispatch(addUser())
                        // props.history.push('/login')
                        redirect()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const addUser = () => {
    return {
        type: 'ADD_USER'
    }
}

export const startLogUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.errors)
                    }else{
                        alert('successfully logged in')
                        localStorage.setItem('token', result.token)
                        dispatch(userLogged())
                        redirect()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
    }
}

export const userLogged = () => {
    return {
        type: 'LOGGED'
    }
}

export const startGetUser = (props) => {
    return (dispatch) => {
        if(!localStorage.getItem('token')) {
            props.history.push('/')
        }
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(getUser(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getUser = result => {
    return {
        type: 'GET_USER',
        payload: result
    }
}

