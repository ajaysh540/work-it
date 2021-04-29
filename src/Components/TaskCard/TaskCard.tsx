import { tasksModel } from "../../Model/Model"
import { deleteTask } from "../../Services/TasksService"
import "./TaskCard.css"

type taskProps={
    task:tasksModel,
    getTasks:any
}

const TaskCard: React.FC<taskProps> = ({task,getTasks}) => {
    const delThisTask =()=>{
        if(window.confirm("Do you want to delete this task?")){
            let deleted = deleteTask(task.id)
            if(deleted){
                getTasks()
            }
            else alert("Could Not Remove Task! Please try again...")
        }       
    }
    return <div key={task.id} className="task-card shadow d-flex flex-column justify-content-around p-1">
        <div className="row no-gutters">
            <label className="col-10">{task.task}</label>
            <div className="col text-right">
                <button className="del-btn" onClick={delThisTask}>X</button>
            </div>
            </div>
        <b className="w-100 text-right">{task.date}</b>
    </div>
} 

export default TaskCard;