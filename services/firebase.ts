import AsyncStorage from '@react-native-async-storage/async-storage'
import { getApp, getApps, initializeApp } from 'firebase/app'
// getReactNativePersistence existe no build React Native do Firebase Auth (SDK 12),
// mas os tipos publicados em `firebase/auth` cobrem só o build web — daí o @ts-ignore.
// @ts-ignore
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth'
import { collection, getDocs, getFirestore, limit, query, where, type Firestore } from 'firebase/firestore'
import type { Produto } from '../types'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// initializeAuth só pode ser chamado uma vez por app; no Fast Refresh a segunda
// chamada lança erro, então caímos para getAuth() nesse caso.
let auth: Auth
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
} catch {
  auth = getAuth(app)
}

export { auth }

export const db: Firestore = getFirestore(app)

export const buscarProdutoPorCodigo = async (codigo: string): Promise<Produto | null> => {
  const produtosRef = collection(db, 'produtos')
  const q = query(produtosRef, where('codigo_barras', '==', codigo), limit(1))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  const dados = doc.data()
  return {
    id: doc.id,
    nome: dados.nome,
    preco_brl: dados.preco_brl,
    codigo_barras: dados.codigo_barras,
    categoria: dados.categoria,
  }
}
