import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { auth } from './firebase'

export const login = (email: string, password: string): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = (): Promise<void> => signOut(auth)

export const observarSessao = (callback: (user: User | null) => void): Unsubscribe =>
  onAuthStateChanged(auth, callback)
