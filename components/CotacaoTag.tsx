import { StyleSheet, Text, View } from 'react-native'

type Props = {
  moeda: string
  valor: string
}

export default function CotacaoTag({ moeda, valor }: Props) {
  return (
    <View style={styles.container}>
      <Text>
        {moeda} {valor}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})
