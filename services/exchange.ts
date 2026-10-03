import type { Cotacoes } from '../types'

const URL_COTACOES = 'https://open.er-api.com/v6/latest/USD'
const TTL_CACHE_MS = 60 * 60 * 1000 // 1 hora (D-01: evita bater rate limit do provedor de cotações)

// Cache em memória (module-level); não precisa persistir em disco.
let cache: { cotacoes: Cotacoes; buscadoEm: number } | null = null

export const buscarCotacoes = async (): Promise<Cotacoes> => {
  if (cache && Date.now() - cache.buscadoEm < TTL_CACHE_MS) {
    return cache.cotacoes
  }

  const resposta = await fetch(URL_COTACOES)
  if (!resposta.ok) {
    throw new Error(`Falha ao buscar cotações: HTTP ${resposta.status}`)
  }

  const dados = await resposta.json()
  const brl = dados?.rates?.BRL
  const eurRate = dados?.rates?.EUR

  if (dados?.result !== 'success' || typeof brl !== 'number' || Number.isNaN(brl) || typeof eurRate !== 'number' || Number.isNaN(eurRate)) {
    throw new Error('Resposta inválida do provedor de cotações')
  }

  const usd = brl
  const eur = brl / eurRate

  const cotacoes: Cotacoes = { usd, eur }
  cache = { cotacoes, buscadoEm: Date.now() }
  return cotacoes
}

export const converter = (valorBRL: number, cotacao: number): string => (valorBRL / cotacao).toFixed(2)
