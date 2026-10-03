import { router } from 'expo-router'
import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Carrinho() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.titulo}>Carrinho</Text>
      <Button
        title="Ir para Confirmação (placeholder)"
        onPress={() =>
          router.push({
            pathname: '/confirmacao',
            params: { totalBRL: '0', cotacaoUSD: '0', cotacaoEUR: '0' },
          })
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
