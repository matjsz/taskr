import { doc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id))
}

export { deleteNote }
