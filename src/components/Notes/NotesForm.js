import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setErrors, startSetErrors } from "../../actions/noteAction";

const NotesForm=props=>{
    const {_id, title: head, body: text, formSubmit, isSaved, handleToggle}=props
    const [title, setTitle] = useState(head ? head: '')
    const [body, setBody] = useState(text ? text: '')
    // const [formErrors,setFormErrors] = useState({'title':'title cannot be blank'})

    const dispatch=useDispatch()

    useEffect(()=>{
        if(isSaved){
            setTitle('')
            setBody('')
        }
    }, [])
    const errors = {}
    const runValidations = () => {
        if(title.trim().length === 0){
            errors['title'] = 'title cannot be blank'
        }
    }
    const handleChange = e => {
        const attr = e.target.name
        if(attr === 'title'){
            setTitle(e.target.value)
        }else if(attr === 'body'){
            setBody(e.target.value)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length === 0){
            // setFormErrors({})
            const formData = {
                _id: _id,
                title: title,
                body: body
            }
            setTitle('')
            setBody('')
            formSubmit(formData)
            if(handleToggle){
                handleToggle()
            }
            // console.log(formData)
        }else{
            dispatch(startSetErrors(errors))
            alert(`Title Cannot be blank`)
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input type = 'text' name = 'title' value = {title} placeholder = 'title' onChange = {handleChange}/>
                <br />
                <textarea name = 'body' placeholder = 'body' value = {body} onChange = {handleChange} /><br />
                <input type = 'submit' value = 'submit' />
            </form>
        </div>
    )
}

export default NotesForm;