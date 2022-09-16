import { doc, addDoc, collection, query, where } from 'firebase/firestore'
import { db } from './firebase'

const createNote = async (owner) => {
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const ref = await addDoc(collection(db, "notes"), {
        banner: getRandomColor(),
        content: "Olá! Esta é sua nova anotação.",
        createdOn: new Date(),
        owner: owner,
        title: "Nova anotação",
        updatedOn: new Date(),
        tag: 'none',
        list: 'none'
    })

    return ref.id
}

export { createNote }
