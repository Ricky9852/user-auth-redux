import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddNote from "./AddNote";
import NotesList from "./NotesList";

const NotesComponent = props => {
    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/')
        }
    }, [])
    return (
        <div className = 'row'>
            <h2>Notes</h2>
            <NotesList />
            <AddNote />
        </div>
    )
}

export default NotesComponent