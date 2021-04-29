import React from "react"
import "./EnterNote.css"

type Controls = {
    close: () => void,
    submit: (text:string) => void
}

const EnterNote: React.FC<Controls> = ({ close, submit }) => {

    const [text, setText] = React.useState("")
    const [loading,setLoading] = React.useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        submit(text);
        setLoading(false)
    }
    const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setText(e.currentTarget.value)
    }

    return <div className="enter-note">
        <button className="close-btn" onClick={close}>X</button>
        <form onSubmit={handleSubmit}>
            <div className="text-area">
                <textarea onChange={handleChange} name="note" required/><br />
                <button type="submit">{loading?
                 <div className="spinner-border" role="status"></div>
                :"Save"}</button>
            </div>
        </form>
    </div>
}

export default EnterNote;
