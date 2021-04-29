import { useEffect, useState } from "react";
import { tasksModel, userModel } from "../../Model/Model";
import { getAllTask, saveNewTask } from "../../Services/TasksService";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskBoard.css"

const TasksBoard: React.FC<userModel> = ({ userId }) => {

    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState<tasksModel[]>([]);
    const [taskDate, setTaskDate] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getTasks()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === "task") setTaskInput(e.currentTarget.value)
        if (e.currentTarget.name === "date") setTaskDate(e.currentTarget.value)
    }
    const getTasks = async () => {
        setLoading(true)
        const allTasks: any[] = await getAllTask()
        setTasks(allTasks.map(t => t.data() as tasksModel));
        setLoading(false)
    }
    const saveTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const saved = saveNewTask(taskInput, taskDate);
        if (saved) {
            getTasks()
            e.currentTarget.reset()
        }
        else
            alert("Task Creation failed! Pease try again...")
        setLoading(false)
    }

    return <div className="task-board">
        <form className="task-form container m-2 row" onSubmit={saveTask}>
            <input type="text" className="col-md-6 col-12 p-1 form-control" onChange={handleChange} placeholder="Task" required name="task" maxLength={100} />
            <input type="date" className="col-md-3 col-7 p-1 form-control" onChange={handleChange}
                placeholder="Date For Task" required name="date" min={new Date().toISOString().split("T")[0]} />
            <button className="col-md-2 col-5">
                {loading ?
                    <div className="spinner-border" role="status"></div> :
                    "Submit"}
            </button>
        </form>
        {loading ?
            <div className="spinner-border" role="status"></div> :
            (tasks.length>0 ?
                tasks.map(t => <TaskCard task={t} getTasks={getTasks}
                    key={t.id} />) : "No Tasks Added Yet!")}
    </div>
}

export default TasksBoard;