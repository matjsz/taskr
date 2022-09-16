import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './firebase'
import { db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

const registerUser = async (email, pass, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://avatars.dicebear.com/api/croodles-neutral/${userCredential.user.uid}.svg`
    })

    await setDoc(doc(db, "tags", userCredential.user.uid), {
        tags: [
            {
                name: "Feito",
                color: "green",
                priority: 1,
                value: "done"
            },
            {
                name: "Fazer",
                color: "red",
                priority: 3,
                value: "undone"
            },
            {
                name: "Fazendo",
                color: "orange",
                priority: 2,
                value: "doing"
            },
            {
                name: "Nenhum",
                color: "gray",
                priority: 0,
                value: "none"
            }
        ],
        done: "Feito",
        doing: "Fazendo",
        undone: "Fazer",
        none: "Nenhum"
    })
} 

export { registerUser }
