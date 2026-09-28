export type Produto = {
  id: string
  nome: string
  preco_brl: number
  codigo_barras: string
  categoria: string
}

// Linha do carrinho e item da venda têm o mesmo formato
export type ItemCarrinho = {
  produto_id: string
  nome: string
  preco_brl: number
  quantidade: number
}

export type Cotacoes = {
  usd: number
  eur: number
}

export type Venda = {
  operador_id: string
  total_brl: number
  cotacao_usd: number // snapshot da cotação usada
  cotacao_eur: number // snapshot da cotação usada
  itens: ItemCarrinho[]
}
