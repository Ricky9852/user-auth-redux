import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNote, showNote,getNotes, startRemoveNote, startShowNote } from "../../actions/noteAction";
import EditNote from "./EditNote";

const NoteItem = props => {
    const {_id, title, body, note} = props
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const handleRemove = () => {
        const confirmRemove = window.confirm('Are you sure ?')
        if(confirmRemove){
            dispatch(startRemoveNote(_id))
            // dispatch(getNotes())
        }
    }

    const handleShow = () => {
        dispatch(startShowNote(_id))
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            {
                toggle ? (
                    <div>
                        <EditNote
                        note = {note}
                        {...note}
                        handleToggle = {handleToggle}/>
                        <button onClick = {handleToggle}>cancel</button>
                    </div>
                ) : (
                    <div className = "card text-white bg-primary mb-3">
                        <div className = "card-header" onClick = {handleShow}>{title}</div>
                        <div className = "card-body">
                            <p className = "card-text" >{body}</p>
                            <div style = {{display: "flex",
                                justifyContent: "right",
                                alignItems: "right"}}>
                                <button onClick = {handleRemove} className = "btn btn-danger">Remove</button>
                                <button onClick = {handleToggle} className = "btn btn-warning">Edit</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default NoteItem;