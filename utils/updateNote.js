import { doc, updateDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

const updateNote = async (id, title, content, bannerUrl) => {
    const docRef = doc(db, "notes", id)
    if(bannerUrl != undefined){
        const updateBanner = await updateDoc(docRef, {
            banner: bannerUrl
        })
    }

    if(content != undefined){
        const updateContent = await updateDoc(docRef, {
            content: content
        })
    }

    if(title != undefined){
        const updateTitle = await updateDoc(docRef, {
            title: title
        })
    }
}

export { updateNote }
