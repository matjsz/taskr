import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

const loginUser = async (email, pass) => {
    const user = await signInWithEmailAndPassword(auth, email, pass)
    return user
}

export { loginUser }
