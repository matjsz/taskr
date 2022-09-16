import { doc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

const deleteList = async (id) => {
    await deleteDoc(doc(db, "lists", id))
}

export { deleteList }
