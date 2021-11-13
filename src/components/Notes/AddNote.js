import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NotesForm from "./NotesForm";
import { startAddNote } from "../../actions/noteAction";

const AddNote = props => {
    const dispatch = useDispatch()
    const [isSaved, setIsSaved] = useState(false)
    // const handleIsSaved=()=>{
    //     setIsSaved(true)
    // }
    const formSubmit = (formData) => {
        dispatch(startAddNote(formData))
        setIsSaved(true)
    }
    return(
        <div className = 'col-md-6'>
            <h2>Add Note</h2>
            <NotesForm formSubmit = {formSubmit} isSaved = {isSaved} />
        </div>
    )
}

export default AddNote