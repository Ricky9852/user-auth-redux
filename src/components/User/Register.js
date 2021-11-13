import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startAddUser, startSetErrors } from "../../actions/userAction";

const Register = props => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const storeErrors = useSelector((state) => {
        return state.user.errors
    })
    const dispatch = useDispatch()

    const errors = {}

    const runValidations = () => {
        if(username.trim().length === 0){
            errors['username'] = 'name cannot be blank'
        }else if(username.length < 5){
            errors['username'] = 'username length should be at least 5'
        }
        if(email.trim().length === 0){
            errors['email'] = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors['email'] = 'invalid email format'
        }
        if(password.length === 0){
            errors['password'] = 'password cannot be blank'
        }else if(password.length < 6){
            errors['password'] = 'password length should be at least 6'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        // console.log('errors',errors);
        const redirect = () => {
            props.history.push('/login')
        }
        if(Object.keys(errors).length === 0){
            dispatch(startSetErrors({}))
            const formData = {
                username: username,
                email: email,
                password: password
            }
            dispatch(startAddUser(formData, redirect))
        }else{
            dispatch(startSetErrors(errors))
            alert(`There are following errors :
            ${Boolean(errors['username']) ? errors['username'] : ''}
            ${Boolean(errors['email']) ? errors['email'] : ''}
            ${Boolean(errors['password']) ? errors['password'] : ''}`)
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'username'){
            setUsername(e.target.value)
        }else if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'password'){
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit = {handleSubmit}>
                <input type = "text" value = {username} placeholder = 'enter your username' name = 'username' onChange = {handleChange} /> 
                <br />

                <input type = "text" value = {email} placeholder = 'enter your email' name = 'email' onChange = {handleChange} /> 
                <br />

                <input type = "password" value = {password} name = 'password' onChange = {handleChange} placeholder = "enter your password"/>
                <br />

                <input type = "submit" value = "Register" />
            </form>
        </div>
    )
}

export default Register;