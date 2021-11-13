import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetUser } from "../../actions/userAction";

const Account = props => {
    const dispatch = useDispatch()
    const user = useSelector((state) => {
        return state.user.data
    })
    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/')
        }
        dispatch(startGetUser(props))
    }, [])
    return (
        <div>
            <h1>User Account</h1>
            <div className = "card text-white bg-dark mb-3">
                <div className = "card-header" >Email - {user.email}</div>
                <div className = "card-body">
                    <p className = "card-text" >Username - {user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Account