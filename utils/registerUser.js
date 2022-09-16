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
} 

export { registerUser }
