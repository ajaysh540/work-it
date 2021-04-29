export type userModel = {
    userId:string
}

export type notesModel = {
    created:string,
    note:string,
    id:string
}

export type tasksModel = {
    created:Object,
    task:string,
    date:string,
    id:string
}


export const notesModelDefault:notesModel = {
    created: "",
    note:"",
    id:""
}
