import type { Cotacoes } from '../types'

const URL_COTACOES = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL'
const TTL_CACHE_MS = 60 * 60 * 1000 // 1 hora (D-01: evita bater rate limit da AwesomeAPI)

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
  const usd = parseFloat(dados?.USDBRL?.bid)
  const eur = parseFloat(dados?.EURBRL?.bid)

  if (Number.isNaN(usd) || Number.isNaN(eur)) {
    throw new Error('Resposta inválida da AwesomeAPI')
  }

  const cotacoes: Cotacoes = { usd, eur }
  cache = { cotacoes, buscadoEm: Date.now() }
  return cotacoes
}

export const converter = (valorBRL: number, cotacao: number): string => (valorBRL / cotacao).toFixed(2)
