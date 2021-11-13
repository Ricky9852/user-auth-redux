import React from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../../actions/noteAction";
import NotesForm from "./NotesForm";

const EditNote = props => {
    const {title, note, handleToggle} = props
    const dispatch = useDispatch()
    const formSubmit = formData => {
        dispatch(editNote(formData))
    }
    return (
        <div>
            <h3>Edit Note for {title}</h3>
            <NotesForm 
            {...note}
            formSubmit = {formSubmit} 
            handleToggle = {handleToggle} />
        </div>
    )
}

export default EditNote