import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import TasksListCarrossel from '../../components/Tasks/ListCarrossel';
import CardTaskValidate from '../../components/Cards/Task/Validate';

export default function TasksValidate() {
  const tarefas = [
    { id: 1, titulo: 'Tarefa 1', status: 'Finalizado' },
    { id: 2, titulo: 'Tarefa 2', status: 'Finalizado' },
    { id: 3, titulo: 'Tarefa 3', status: 'Finalizado' },
    { id: 4, titulo: 'Tarefa 4', status: 'Finalizado' },
    { id: 5, titulo: 'Tarefa 5', status: 'Finalizado' },
  ];

  const router = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <Text style={styles.title}>TAREFAS A VALIDAR</Text>

      </View>

      <TasksListCarrossel
        tasks={tarefas}
        renderCard={(task) => (<CardTaskValidate task={tarefas[0]} />)}
      />

      <Button
        text="Voltar a lista"
        onPress={() => router.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
