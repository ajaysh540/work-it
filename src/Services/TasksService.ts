import { auth, storage } from "./Firebase";
import firebase from "firebase/app"

export const saveNewTask = (task: string,date:string) => {
    let id = auth.currentUser?.uid;
    let saved = storage.collection("Task")
      .doc(id).collection("myTask").add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        task: task,
        date: date,
        id: storage.collection("Task").doc().id
      }).then(res => {
        return true
      })
      .catch(() => {
        return false
      })
    return saved;
  }
  
  export const getAllTask = async () => {
    let id = auth.currentUser?.uid
    let values: any;
    if (id)
      values = storage.collection("Task").doc(id).collection("myTask").orderBy("created", "desc").get().then(async res => await res.docs)
  
    return await values;
  }
  
  export const deleteTask = (noteId: string) => {
    let id = auth.currentUser?.uid;
    const val = storage.collection("Task").doc(id).collection("myTask").where("id","==",noteId)
      .get().then(async res => {
        await res.docs[0].ref.delete().then(res=> true).catch(err=> false)
      }).catch(err=>{
        return false;
      })
      return val;
      // .get().then(async res=>{console.log(await res.docs);
  }