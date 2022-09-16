import { doc, addDoc, collection, query, where } from 'firebase/firestore'
import { db } from './firebase'

const createList = async (owner) => {
    const ref = await addDoc(collection(db, "lists"), {
        name: 'Lista',
        owner: owner,
        notes: []
    })
}

export { createList }
