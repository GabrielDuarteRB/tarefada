import {  View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardTask({ title }: { title: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfos}>
        <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color={'green'}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => console.log('Excluir Tarefa 1')}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={'red'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Editar Tarefa 1')}>
          <Ionicons
            name="pencil-outline"
            size={24}
            color={'blue'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardInfos: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16
  },
  actionText: {
    color: '#007BFF',
    fontSize: 16,
  },
});