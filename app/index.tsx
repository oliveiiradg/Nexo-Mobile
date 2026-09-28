import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { observarSessao } from '../services/auth'

export default function Index() {
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const unsubscribe = observarSessao((user) => {
      setCarregando(false)
      router.replace(user ? '/caixa' : '/login')
    })
    return unsubscribe
  }, [])

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
