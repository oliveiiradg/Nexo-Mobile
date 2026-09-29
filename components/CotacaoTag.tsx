import { StyleSheet, Text, View } from 'react-native'

type Props = {
  moeda: string
  valor: string
}

export default function CotacaoTag({ moeda, valor }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.moeda}>{moeda}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    minWidth: 80,
  },
  moeda: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
