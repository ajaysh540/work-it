import { notesModel, notesModelDefault, userModel } from "../../Model/Model";
import EnterNote from "../EnterNote/EnterNote";
import "./notesboard.css"
import { saveNewNote, getAllNotes, deleteNote } from "../../Services/NotesServices"
import React, { useEffect } from "react";
import NotesCard from "../NotesCard";
import DisplayNote from "./DisplayNotes";
const NotesBoard: React.FC<userModel> = ({ userId }) => {
    const [hide, setHide] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [notes, setNotes] = React.useState<notesModel[]>([]);
    const [noteFull, setNoteFull] = React.useState<notesModel>(notesModelDefault);
    const [showNote, setShowNote] = React.useState(false);

    useEffect(() => {
        getCollections();
    }, [])

    const showFullNote = (note: notesModel) => {
        setNoteFull(note)
        setShowNote(true)
    }
    const hideNote = () => {
        setShowNote(false)
    }
    const deleteIt = (id: string) => {
        const isDeleted = deleteNote(id);
        if (isDeleted) hideNote()
        else {
            alert("Deleting Note Failed! Please try again later...")
            hideNote()
        }
        getCollections()
    }

    const getCollections = async () => {
        setLoading(true)
        const value: any[] = await getAllNotes()
        if (value) {
            let vals: notesModel[] = [];
            value.forEach(v => {
                vals.push(v.data() as notesModel);
                return;
            })
            setNotes(vals)
        }
        setLoading(false)
    }

    const createNewNote = () => {
        setHide(false)
    }

    const close = () => {
        setHide(true)
    }

    const submit = (text: string) => {
        const saved = saveNewNote(text).then(res => res);
        if (saved) {
            setHide(true)
            getCollections()
        }
        else {
            alert("Saving Failed! Please try again later...")
            setHide(true)
        }
    }



    return <>
        {hide ? "" :
            <EnterNote close={close} submit={submit} />}
        <div className="show-notes">
            {loading ?
                <div className="jumbotron text-center bg-transparent">
                    <div className="spinner-border" role="status"></div>
                </div>
                :
                notes.length > 0 ?
                    <div className="container-fluid mt-1 card-container">
                        {notes.map(note => <NotesCard note={note} showNote={showFullNote} key={note.id} />)}
                    </div>
                    :
                    <div className="jumbotron text-center bg-transparent">
                        No Notes Available! Create A New One...
                    </div>}
        </div>
        {showNote ?
            <DisplayNote note={noteFull} hideNote={hideNote} deleteIt={deleteIt} />
            : ""}
        <button className="new-note-btn" onClick={createNewNote}>+</button>
    </>
}

export default NotesBoard;