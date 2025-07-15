import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

import Button from '../../../../../components/Button';
import TasksListCarrossel from '../../../../../components/Tasks/ListCarrossel';
import CardTaskValidate from '../../../../../components/Cards/Task/Validate';
import Loader from '../../../../../components/Loader';

import { useTaskStore } from '../../../../../stores/taskStore';

export default function TasksValidate() {
  const { id, date } = useLocalSearchParams();

  const taskStore = useTaskStore();
  const { tasks, findTasks, resetTasks } = taskStore;

  const [isLoading, setIsLoading] = useState(true);

  const router = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    async function fetchTasks() {
      resetTasks(); // Limpa tarefas antes de buscar
      const params = { id_semana: id, data_inicio: date, status: 'pendente' };
      await findTasks(params);
      setIsLoading(false);
    }
    fetchTasks();
  }, [id, date]);


    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Loader />
        </View>
      );
    }

    if (tasks.length === 0) {
      return (
        <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
            Nenhuma tarefa pendente para validação.
          </Text>
          <Button
            text="Voltar"
            onPress={() => router.goBack()}
          />
        </View>
      );
    }

  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <Text style={styles.title}>TAREFAS A VALIDAR</Text>

      </View>

      <TasksListCarrossel
        tasks={tasks}
        renderCard={(task) => (<CardTaskValidate task={task} />)}
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
