import { router } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Caixa() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Caixa</Text>
      <Button title="Ir para Carrinho (placeholder)" onPress={() => router.push('/carrinho')} />
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
