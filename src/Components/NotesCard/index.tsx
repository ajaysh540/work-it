import { notesModel } from "../../Model/Model"
import "./NotesCard.css"

type Notes = {
    note: notesModel,
    showNote: (note: notesModel) => void
}

const NotesCard: React.FC<Notes> = ({ note, showNote }) => {
    
    return <button key={note.id} className="note-card"
        onClick={() => showNote(note)}>
        <label className="text-danger">{note.created.split("T")[0]}</label>
        <br />
        {note.note.substring(0, 350)}
    </button>
}

export default NotesCard;

