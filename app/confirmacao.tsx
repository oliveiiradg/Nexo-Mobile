import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CotacaoTag from '../components/CotacaoTag'
import { useCarrinho } from '../context/CarrinhoContext'
import { auth } from '../services/firebase'
import { salvarVenda } from '../services/vendas'
import type { Venda } from '../types'

const TEMPO_DE_FEEDBACK_MS = 1200

export default function Confirmacao() {
  const { totalBRL, cotacaoUSD, cotacaoEUR } = useLocalSearchParams<{
    totalBRL: string
    cotacaoUSD: string
    cotacaoEUR: string
  }>()
  const { itens, limparCarrinho } = useCarrinho()

  const total = Number(totalBRL)
  const usd = Number(cotacaoUSD)
  const eur = Number(cotacaoEUR)

  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (!auth.currentUser?.uid) {
      router.replace('/login')
    }
  }, [])

  const handleVoltar = () => {
    router.back()
  }

  const handleConfirmar = async () => {
    const operadorId = auth.currentUser?.uid
    if (!operadorId) {
      router.replace('/login')
      return
    }

    setErro(null)
    setSalvando(true)
    try {
      const venda: Venda = {
        operador_id: operadorId,
        total_brl: total,
        cotacao_usd: usd,
        cotacao_eur: eur,
        itens,
      }
      await salvarVenda(venda)
      setSucesso(true)
      setTimeout(() => {
        limparCarrinho()
        router.replace('/caixa')
      }, TEMPO_DE_FEEDBACK_MS)
    } catch (e) {
      console.error('Erro ao salvar venda:', e)
      setErro('Não foi possível registrar a venda. Tente novamente.')
      setSalvando(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.titulo}>Confirmação</Text>

      <View style={styles.lista}>
        {itens.map((item) => (
          <View key={item.produto_id} style={styles.linha}>
            <Text style={styles.linhaNome}>
              {item.quantidade}x {item.nome}
            </Text>
            <Text style={styles.linhaPreco}>R$ {(item.preco_brl * item.quantidade).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totais}>
        <CotacaoTag moeda="BRL" valor={`R$ ${total.toFixed(2)}`} />
        <CotacaoTag moeda="USD" valor={`US$ ${(total / usd).toFixed(2)}`} />
        <CotacaoTag moeda="EUR" valor={`€ ${(total / eur).toFixed(2)}`} />
      </View>

      {sucesso ? <Text style={styles.sucesso}>Venda registrada!</Text> : null}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Pressable style={styles.botaoSecundario} onPress={handleVoltar} disabled={salvando}>
        <Text style={styles.botaoSecundarioTexto}>Voltar</Text>
      </Pressable>

      <Pressable
        style={[styles.botaoPrimario, salvando && styles.botaoDesabilitado]}
        onPress={handleConfirmar}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoPrimarioTexto}>Confirmar e Salvar</Text>
        )}
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 16,
    gap: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lista: {
    gap: 8,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linhaNome: {
    fontSize: 16,
  },
  linhaPreco: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  sucesso: {
    color: '#27ae60',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  erro: {
    color: '#c0392b',
    textAlign: 'center',
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
