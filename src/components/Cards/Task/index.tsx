import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTaskStore } from '../../../stores/taskStore';

type Props = {
  title: string;
  id: number | null;
  handleExcluir: (id: number | null) => void;
};

export default function CardTask({ title, id, handleExcluir }: Props) {
  const navigation = useNavigation();

  function handleCardPress() {
    navigation.navigate('task/[id]', { id });
  }

  function handleEditar() {
    navigation.navigate('edit_task/[id]', { id });
  }


  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleCardPress}>
      <View style={styles.cardInfos}>
        <Ionicons name="checkmark-circle-outline" size={24} color={'green'} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleExcluir(id)}>
          <Ionicons name="trash-outline" size={24} color={'red'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEditar}>
          <Ionicons name="pencil-outline" size={24} color={'blue'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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