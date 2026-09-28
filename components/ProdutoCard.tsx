import { StyleSheet, Text, View } from 'react-native'
import type { ItemCarrinho } from '../types'

type Props = {
  item: ItemCarrinho
}

export default function ProdutoCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <Text>{item.nome}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
})
