import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

const removeFromList = async (id, noteID) => {
    if(id == 'none'){
        return
    } else{
        const docRef = doc(db, "lists", id)

        updateDoc(docRef, {
            notes: arrayRemove(noteID)    
        })
    }
}

export { removeFromList }
