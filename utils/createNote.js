import { doc, addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

const createNote = async (owner) => {
    const request = await fetch('https://random.imagecdn.app/v1/image?width=1360&height=200&format=json')
    const data = await request.json()
    let bannerUrl = data.url

    const ref = await addDoc(collection(db, "notes"), {
            banner: bannerUrl,
            content: "Olá! Esta é sua nova anotação.",
            createdOn: new Date(),
            owner: owner,
            title: "Nova anotação",
            updatedOn: new Date()
        })

    return ref.id
}

export { createNote }
