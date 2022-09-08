import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

const getAllNotes = async (owner) => {
    var notes = []
    const notesRef = collection(db, "notes")
    const q = query(notesRef, where("owner", "==", owner))

    const snap = await getDocs(q)
    snap.forEach((doc) => {
        notes.push({id: doc.id, data: doc.data()})
    })

    return notes
}

export { getAllNotes }
