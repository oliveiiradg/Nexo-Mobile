import { router } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Carrinho() {
  return (
    <View style={styles.container}>
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
    </View>
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
