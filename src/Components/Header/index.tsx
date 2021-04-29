import React from "react";
import "./Header.css"
type option = {
    changeTab: (tab: string) => void,
    selected: boolean,
    logout: () => void
}

const Header: React.FC<option> = ({ changeTab, selected, logout }) => {

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between header p-2">
                <h5 className="my-auto">Work-It</h5>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
            <div className="w-100">
                <button className="header-button py-1 mx-0" disabled={selected}
                    onClick={() => { changeTab("Notes") }}>
                    Notes
                </button>
                <button className="header-button py-1 mx-0" disabled={selected ? false : true}
                    onClick={() => { changeTab("Tasks") }}>
                    Tasks
                 </button>
            </div>
        </React.Fragment>
    )
}

export default Header;