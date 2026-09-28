import { router } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Button title="Entrar (placeholder)" onPress={() => router.replace('/caixa')} />
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
