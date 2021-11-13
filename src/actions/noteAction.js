import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const startSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddNote = (formData) => {
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            }
        )
            .then((response) => {
                const result = response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                    }else{
                        alert('note posted successfully')
                        dispatch(addNote(result))
                    }
            })
            .catch((err) => {
                alert(err.message)
            })
        
    }
}

export const addNote = (result) => {
    return {
        type: 'ADD_NOTE',
        payload: result
    }
}

export const startGetNotes = () => {
    return (dispatch) => {
        axios.get('http://dct-user-auth.herokuapp.com/api/notes', {
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('allnotes', result);
                dispatch(getNote(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getNote = result => {
    return {
        type: 'GET_NOTES',
        payload: result
    }
}

export const startRemoveNote = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    const id = result._id
                    dispatch(removeNote(id))
                })
                .catch((err => {
                    alert(err.message)
                }))
    }
}

export const removeNote = (id) => {
    return {
        type: 'REMOVE_NOTE',
        payload: id
    }
}

export const startEditNote = (formData) => {
    console.log('formdata', formData)
    // formData._id=prop
    return (dispatch) => {
        axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${formData._id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    dispatch(editNote(result))
                    alert('note edited successfully')
                })
                .catch((err=> {
                    alert(err.message)
                }))
    }
}

export const editNote = (result) => {
    return {
        type: 'EDIT_NOTE',
        payload: result
    }
}

export const startShowNote = (_id) => {
    return (dispatch) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    
                    html: <div>
                            <h1>{result.title}</h1><hr/>
                            <p>{result.body}</p>
                        </div>
                })
                dispatch(showNote())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


export const showNote = () => {
    return {
        type: 'SHOW_NOTE'
    }
}

