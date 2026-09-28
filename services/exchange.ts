import type { Cotacoes } from '../types'

const URL_COTACOES = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL'

export const buscarCotacoes = async (): Promise<Cotacoes> => {
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

  return { usd, eur }
}

export const converter = (valorBRL: number, cotacao: number): string => (valorBRL / cotacao).toFixed(2)
