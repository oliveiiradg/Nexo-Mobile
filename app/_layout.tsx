import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CarrinhoProvider } from '../context/CarrinhoContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CarrinhoProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CarrinhoProvider>
    </SafeAreaProvider>
  )
}
