import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { logout } from '../services/auth'
import { buscarProdutoPorCodigo } from '../services/firebase'
import { useCarrinho } from '../context/CarrinhoContext'

const TIPOS_DE_CODIGO = ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128'] as const
const TEMPO_DE_LIBERACAO_MS = 1500

type Feedback = {
  tipo: 'sucesso' | 'erro'
  mensagem: string
}

export default function Caixa() {
  const [permission, requestPermission] = useCameraPermissions()
  const [travado, setTravado] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [saindo, setSaindo] = useState(false)
  const travadoRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { quantidadeTotal, adicionarItem } = useCarrinho()

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    // A trava real é a ref: setState é assíncrono e a CameraView pode chamar
    // onBarcodeScanned várias vezes antes do próximo render aplicar `travado`.
    if (travadoRef.current) return
    travadoRef.current = true
    setTravado(true)
    try {
      const produto = await buscarProdutoPorCodigo(data)
      if (produto) {
        adicionarItem(produto)
        setFeedback({ tipo: 'sucesso', mensagem: 'Produto adicionado' })
      } else {
        setFeedback({ tipo: 'erro', mensagem: 'Produto não cadastrado' })
      }
    } catch (e) {
      console.error('Erro ao consultar produto:', e)
      setFeedback({ tipo: 'erro', mensagem: 'Não foi possível consultar o produto' })
    } finally {
      timerRef.current = setTimeout(() => {
        travadoRef.current = false
        setTravado(false)
        setFeedback(null)
      }, TEMPO_DE_LIBERACAO_MS)
    }
  }

  const handleLogout = async () => {
    setSaindo(true)
    try {
      await logout()
      router.replace('/login')
    } catch (e) {
      console.error('Erro ao sair:', e)
      setFeedback({ tipo: 'erro', mensagem: 'Não foi possível sair. Tente novamente.' })
    } finally {
      setSaindo(false)
    }
  }

  if (!permission) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.permissaoTexto}>Precisamos da sua permissão para usar a câmera e escanear os produtos.</Text>
        <Pressable style={styles.botaoPermissao} onPress={requestPermission}>
          <Text style={styles.botaoPermissaoTexto}>Permitir acesso à câmera</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: [...TIPOS_DE_CODIGO] }}
        onBarcodeScanned={travado ? undefined : handleBarcodeScanned}
      />

      <View style={styles.topo}>
        <Pressable style={styles.botaoLogout} onPress={handleLogout} disabled={saindo}>
          {saindo ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoLogoutTexto}>Sair</Text>}
        </Pressable>
      </View>

      {feedback ? (
        <View style={[styles.feedback, feedback.tipo === 'erro' && styles.feedbackErro]}>
          <Text style={styles.feedbackTexto}>{feedback.mensagem}</Text>
        </View>
      ) : null}

      <View style={styles.rodape}>
        <Pressable style={styles.botaoCarrinho} onPress={() => router.push('/carrinho')}>
          <Text style={styles.botaoCarrinhoTexto}>Ver Carrinho ({quantidadeTotal})</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  permissaoTexto: {
    textAlign: 'center',
    fontSize: 16,
  },
  botaoPermissao: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  botaoPermissaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topo: {
    position: 'absolute',
    top: 48,
    right: 16,
  },
  botaoLogout: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  botaoLogoutTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  feedback: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(39,174,96,0.9)',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  feedbackErro: {
    backgroundColor: 'rgba(192,57,43,0.9)',
  },
  feedbackTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rodape: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  botaoCarrinho: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botaoCarrinhoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
