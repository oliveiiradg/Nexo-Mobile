import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { ItemCarrinho } from '../types'

type Props = {
  item: ItemCarrinho
  onRemover: (produtoId: string) => void
}

export default function ProdutoCard({ item, onRemover }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.detalhe}>
          R$ {item.preco_brl.toFixed(2)} · Qtd. {item.quantidade}
        </Text>
      </View>
      <Pressable style={styles.botaoRemover} onPress={() => onRemover(item.produto_id)}>
        <Text style={styles.botaoRemoverTexto}>Remover</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalhe: {
    color: '#555',
    marginTop: 4,
  },
  botaoRemover: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botaoRemoverTexto: {
    color: '#c0392b',
    fontWeight: 'bold',
  },
})
