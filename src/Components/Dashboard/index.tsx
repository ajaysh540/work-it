import React from "react";
import NotesBoard from "../NotesBoard"
import TasksBoard from "../TasksBoard"
import Header from "../Header";
import { auth, firebaseApp } from "../../Services/Firebase";
import { useHistory } from "react-router";

const Dashboard = () => {
    const [tab, setTab] = React.useState(true);
    const [userId, setUserId] = React.useState('');
    const history = useHistory()

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid)
                history.push("/")
            }
            else {
                history.push("/login")
            }
        })
    }, [history])

    const logout = () => {
        firebaseApp.auth().signOut();
        history.push("/login")
    }
    const switchTab = (changeTab: string) => {
        if (changeTab === "Notes") {
            setTab(true)
        }
        else {
            setTab(false)
        }
    }

    return <div>
        <Header changeTab={switchTab} selected={tab} logout={logout} />
        {tab ?
            <NotesBoard userId = {userId}/> :
            <TasksBoard userId = {userId}/>}
    </div>
}

export default Dashboard;