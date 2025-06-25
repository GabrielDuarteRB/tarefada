import {  View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { TaskInterface } from '../../../types/TaskInterface';

type Props = {
  task: TaskInterface
}

export default function CardTaskValidate({ task } : Props) {
  return (
    <Link href={`/task/${task.id}`} asChild>
      <Pressable style={styles.card}>
        <Text>13/04/2023, 11:32</Text>
        <View style={styles.cardInfos}>
          <Text style={styles.title}>{task.titulo}</Text>
          <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={'blue'}
          />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});