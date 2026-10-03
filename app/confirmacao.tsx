import { router } from 'expo-router'
import { Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Confirmacao() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.titulo}>Confirmação</Text>
      <Button title="Voltar ao Caixa (placeholder)" onPress={() => router.replace('/caixa')} />
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
