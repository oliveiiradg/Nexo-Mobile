import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import CotacaoTag from '../components/CotacaoTag'
import ProdutoCard from '../components/ProdutoCard'
import { useCarrinho } from '../context/CarrinhoContext'
import { buscarCotacoes, converter } from '../services/exchange'
import type { Cotacoes } from '../types'

export default function Carrinho() {
  const { itens, totalBRL, removerItem } = useCarrinho()

  const [cotacoes, setCotacoes] = useState<Cotacoes | null>(null)
  const [carregandoCotacoes, setCarregandoCotacoes] = useState(true)
  const [cotacaoIndisponivel, setCotacaoIndisponivel] = useState(false)
  const [cotacaoDesatualizada, setCotacaoDesatualizada] = useState(false)
  const temCotacaoRef = useRef(false)

  useEffect(() => {
    const buscar = async () => {
      try {
        const novas = await buscarCotacoes()
        temCotacaoRef.current = true
        setCotacoes(novas)
        setCotacaoIndisponivel(false)
        setCotacaoDesatualizada(false)
      } catch (e) {
        console.error('Erro ao buscar cotações:', e)
        if (temCotacaoRef.current) {
          setCotacaoDesatualizada(true)
        } else {
          setCotacaoIndisponivel(true)
        }
      } finally {
        setCarregandoCotacoes(false)
      }
    }

    buscar()
  }, [])

  const podeConfirmar = itens.length > 0 && cotacoes !== null

  const handleConfirmar = () => {
    if (!cotacoes) return
    router.push({
      pathname: '/confirmacao',
      params: {
        totalBRL: String(totalBRL),
        cotacaoUSD: String(cotacoes.usd),
        cotacaoEUR: String(cotacoes.eur),
      },
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>

      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>Nenhum produto escaneado ainda</Text>
        </View>
      ) : (
        <FlatList
          style={styles.lista}
          data={itens}
          keyExtractor={(item) => item.produto_id}
          renderItem={({ item }) => <ProdutoCard item={item} onRemover={removerItem} />}
        />
      )}

      <View style={styles.rodape}>
        {carregandoCotacoes ? (
          <ActivityIndicator />
        ) : cotacaoIndisponivel ? (
          <Text style={styles.avisoErro}>Cotação indisponível</Text>
        ) : (
          <>
            {cotacaoDesatualizada ? <Text style={styles.avisoDiscreto}>Cotação desatualizada</Text> : null}
            <View style={styles.totais}>
              <CotacaoTag moeda="BRL" valor={`R$ ${totalBRL.toFixed(2)}`} />
              <CotacaoTag moeda="USD" valor={cotacoes ? `US$ ${converter(totalBRL, cotacoes.usd)}` : '—'} />
              <CotacaoTag moeda="EUR" valor={cotacoes ? `€ ${converter(totalBRL, cotacoes.eur)}` : '—'} />
            </View>
          </>
        )}

        <Pressable style={styles.botaoSecundario} onPress={() => router.back()}>
          <Text style={styles.botaoSecundarioTexto}>Continuar Escaneando</Text>
        </Pressable>

        <Pressable
          style={[styles.botaoPrimario, !podeConfirmar && styles.botaoDesabilitado]}
          onPress={handleConfirmar}
          disabled={!podeConfirmar}
        >
          <Text style={styles.botaoPrimarioTexto}>Confirmar Venda</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  lista: {
    flex: 1,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  rodape: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  totais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  avisoErro: {
    color: '#c0392b',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avisoDiscreto: {
    color: '#b7791f',
    textAlign: 'center',
    fontSize: 12,
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: '#1f6feb',
    fontWeight: 'bold',
  },
  botaoPrimario: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#9db8dd',
  },
  botaoPrimarioTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
