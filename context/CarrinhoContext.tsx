import React, { createContext, useContext, useMemo, useState } from 'react'
import type { ItemCarrinho, Produto } from '../types'

type CarrinhoContextValue = {
  itens: ItemCarrinho[]
  quantidadeTotal: number
  totalBRL: number
  adicionarItem: (produto: Produto) => void
  removerItem: (produtoId: string) => void
  limparCarrinho: () => void
}

const CarrinhoContext = createContext<CarrinhoContextValue | null>(null)

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  const adicionarItem = (produto: Produto) => {
    setItens((atual) => {
      const existente = atual.find((item) => item.produto_id === produto.id)
      if (existente) {
        return atual.map((item) =>
          item.produto_id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      }
      return [
        ...atual,
        {
          produto_id: produto.id,
          nome: produto.nome,
          preco_brl: produto.preco_brl,
          quantidade: 1,
        },
      ]
    })
  }

  const removerItem = (produtoId: string) => {
    setItens((atual) => atual.filter((item) => item.produto_id !== produtoId))
  }

  const limparCarrinho = () => setItens([])

  const quantidadeTotal = useMemo(() => itens.reduce((soma, item) => soma + item.quantidade, 0), [itens])

  const totalBRL = useMemo(() => {
    const total = itens.reduce((soma, item) => soma + item.preco_brl * item.quantidade, 0)
    return Math.round(total * 100) / 100
  }, [itens])

  const value: CarrinhoContextValue = {
    itens,
    quantidadeTotal,
    totalBRL,
    adicionarItem,
    removerItem,
    limparCarrinho,
  }

  return <CarrinhoContext.Provider value={value}>{children}</CarrinhoContext.Provider>
}

export const useCarrinho = (): CarrinhoContextValue => {
  const context = useContext(CarrinhoContext)
  if (!context) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider')
  }
  return context
}
