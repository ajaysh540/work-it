import { notesModel } from "../../Model/Model";
import "./notesboard.css"

type Notes = {
    note: notesModel,
    hideNote: () => void,
    deleteIt: (id:string) => void
}



const DisplayNote: React.FC<Notes> = ({ note, hideNote,deleteIt }) => {

    return <div className="show-note">
        <button className="close-btn" onClick={hideNote}>X</button>
        <div className="note">
            {note.note}
        </div>
        <button className="delete-btn" onClick={()=>deleteIt(note.id)}>Delete</button>
    </div>
}

export default DisplayNote;