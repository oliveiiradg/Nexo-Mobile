import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { login, observarSessao } from '../services/auth'

const mensagemDeErro = (codigo: string): string => {
  switch (codigo) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.'
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente em instantes.'
    case 'auth/network-request-failed':
      return 'Sem conexão. Verifique a internet.'
    default:
      return 'Não foi possível entrar. Tente novamente.'
  }
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = observarSessao((user) => {
      if (user) {
        router.replace('/caixa')
      }
    })
    return unsubscribe
  }, [])

  const handleEntrar = async () => {
    setErro(null)
    setCarregando(true)
    try {
      await login(email, senha)
      router.replace('/caixa')
    } catch (e) {
      console.error('Erro no login:', e)
      const codigo = e instanceof Error && 'code' in e ? String((e as { code: unknown }).code) : ''
      setErro(mensagemDeErro(codigo))
    } finally {
      setCarregando(false)
    }
  }

  const desabilitado = !email || !senha || carregando

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.titulo}>NEXO Mobile</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Pressable
        style={[styles.botao, desabilitado && styles.botaoDesabilitado]}
        onPress={handleEntrar}
        disabled={desabilitado}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Entrar</Text>
        )}
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  erro: {
    color: '#c0392b',
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#9db8dd',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
