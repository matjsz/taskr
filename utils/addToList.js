import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

const addToList = async (id, noteID) => {
    if(id == 'none'){
        return
    } else{
        const docRef = doc(db, "lists", id)

        updateDoc(docRef, {
            notes: arrayUnion(noteID)    
        })
    }
}

export { addToList }
