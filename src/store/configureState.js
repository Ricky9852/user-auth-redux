import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { noteReducer } from '../reducers/notesReducer'
import  { userReducer,loggedReducer } from '../reducers/userReducer'

const configureState = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        isLoggedIn: loggedReducer,
        notes: noteReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureState