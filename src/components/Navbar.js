import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link,Route,withRouter} from 'react-router-dom'
import { getUser, userLogged } from "../actions/userAction";
import Account from "./User/Account";
import Home from "./User/Home";
import Login from "./User/Login";
import NotesComponent from "./Notes/NotesComponent";
import Register from "./User/Register";

const Navbar = props => {
    const isLoggedIn = useSelector( (state) => {
        return state.isLoggedIn
    })
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(userLogged())
    }, [])
    return (
        <div className = 'list-group'>
            <Link className = 'list-group-item list-group-item-action' to = '/'>Home</Link>
            {
                !isLoggedIn ? 
                (
                    <>
                        <Link className = 'list-group-item list-group-item-action' to = '/register'>Register</Link>
                        <Link className = 'list-group-item list-group-item-action' to = '/login'>Login</Link>
                    </> 
                ) : (
                    <>
                        <Link className = 'list-group-item list-group-item-action' to = '/account' onClick = {() => {
                            dispatch(getUser())
                        }}>Account</Link>
                        <Link className = 'list-group-item list-group-item-action' to = '/notes'>Notes</Link>
                        <Link className = 'list-group-item list-group-item-action' to = '#' onClick = {()=>{
                            localStorage.removeItem('token')
                            props.history.push('/')
                            dispatch(userLogged())
                            alert('successfullly logged out')
                        }}>Logout</Link>
                    </>
                )
                
            }
            
            <Route path = '/' component = {Home} exact />
            <Route path = '/register' component = {Register} exact />
            <Route path = '/login' component = {Login} exact />
            <Route path = '/account' component = {Account} exact />
            <Route path = '/notes' component = {NotesComponent} exact />
        </div>
    )
}

const WrapperComponent = withRouter(Navbar)
export default WrapperComponent;