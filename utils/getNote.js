import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

const getNote = async (id) => {
    const docRef = getDoc(doc(db, "notes", id))

    return docRef
}

export { getNote }
