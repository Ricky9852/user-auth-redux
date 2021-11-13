import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetNotes } from "../../actions/noteAction";
import NoteItem from "./NoteItem";

const NotesList = props => {
    const notes = useSelector((state) => {
        return state.notes.data
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetNotes())
    },[])
    console.log('notes', notes)
    return (
        <div className = 'col-md-6'>
            <h2>My Notes</h2>
            {notes.length === 0 ? (
                <h2>no notes found</h2>
            ):(
                <div>
                    {notes.map((note) => {
                        return <NoteItem key = {note._id} note = {note} {...note}/>
                    })}
                </div>
            )
            }
        </div>
    )
}

export default NotesList