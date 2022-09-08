import { signOut } from 'firebase/auth'
import { auth } from './firebase'

const logout = async () => {
    signOut(auth)
        .then(() => {
            return '200'
        })
        .catch((err) => {
            return err
        })
} 

export { logout }
