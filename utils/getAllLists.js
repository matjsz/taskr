import { doc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './firebase'

const getAllLists = async (owner) => {
    var lists = []
    const listsRef = collection(db, "lists")
    const q = query(listsRef, where("owner", "==", owner))

    const snap = await getDocs(q)
    snap.forEach((doc) => {
        lists.push({id: doc.id, data: doc.data()})
    })

    return lists
}

export { getAllLists }
