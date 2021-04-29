import { auth, storage } from "./Firebase";

export const saveNewNote = (text: string) => {
    let id = auth.currentUser?.uid;
    let saved = storage.collection("notes")
      .doc(id).collection("mynotes").add({
        created: new Date().toLocaleDateString(),
        note: text,
        id: storage.collection("notes").doc().id
      }).then(res => {
        return true
      })
      .catch(() => {
        return false
      })
    return saved;
  }
  
  export const getAllNotes = async () => {
    let id = auth.currentUser?.uid
    let values: any;
    if (id)
      values = storage.collection("notes").doc(id).collection("mynotes").orderBy("created", "desc").get().then(async res => await res.docs)
    
    return await values;
  }
  
  export const deleteNote = (noteId: string) => {
    let id = auth.currentUser?.uid;
    const val = storage.collection("notes").doc(id).collection("mynotes").where("id","==",noteId)
      .get().then(async res => {
        await res.docs[0].ref.delete().then(res=> true).catch(err=> false)
      }).catch(err=>{
        return false;
      })
      return val;
      // .get().then(async res=>{console.log(await res.docs);
  }