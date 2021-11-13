const noteInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const noteReducer = ( state = noteInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS' : {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_NOTE': {
            // return {...state, data: [{...action.payload}, ...state.data]}
            return {...state, data: [...state.data, {...action.payload}]}
        }
        case 'GET_NOTES': {
            return {...state, data: [...action.payload]}
            // return [...state.data,{...action.payload}]
        }
        case 'REMOVE_NOTE': {
            const result = state.data.filter((note) => {
                return note._id !== action.payload
            })
            return {...state, data: [...result]}
        }
        case 'EDIT_NOTE': {
            const result = state.data.map((note) => {
                if(note._id === action.payload._id){
                    return {...note, ...action.payload}
                }else{
                    return {...note}
                }
            })
            return {...state, data: [...result]}
        }
        case 'SHOW_NOTE': {
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}
