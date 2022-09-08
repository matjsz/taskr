import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './firebase'

const registerUser = async (email, pass, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    updateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://avatars.dicebear.com/api/croodles-neutral/${userCredential.user.uid}.svg`
    })
    return userCredential
} 

export { registerUser }
