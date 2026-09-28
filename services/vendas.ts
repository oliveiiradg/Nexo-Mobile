import { addDoc, collection, serverTimestamp, type DocumentReference } from 'firebase/firestore'
import { db } from './firebase'
import type { Venda } from '../types'

export const salvarVenda = (venda: Venda): Promise<DocumentReference> =>
  addDoc(collection(db, 'vendas'), {
    ...venda,
    created_at: serverTimestamp(),
  })
