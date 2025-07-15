import { useRef, useState,useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import ButtonSuccess from '../components/Button/Success';
import TasksListCarrossel from '../components/Tasks/ListCarrossel';
import CardTask from '../components/Cards/Task';
import { useWeekStore } from '../stores/weekStore';
import { useTaskStore } from '../stores/taskStore';

const ITEM_HEIGHT = 80;

export default function CreateWeek() {
  const weekStore = useWeekStore();
  const taskStore = useTaskStore();
  const { week, currentWeek, createWeek } = weekStore;
  const { tasks, findTasks, resetTasks } = taskStore

  useEffect(() => {
    async function fetchAndCreateWeek() {
      await currentWeek();

      const { week: semanaAtual }: any = useWeekStore.getState();

      if (Object.keys(semanaAtual).length === 0) {
        const hoje = new Date()

        const body = {
          data_inicio: hoje,
        };

        await createWeek(body);
      } else {
        const params = { id_semana: semanaAtual.id_semana };
        resetTasks(); // Limpa as tarefas antes de buscar
        findTasks(params)
      }
    }

    fetchAndCreateWeek();
  }, []);

  return (
    <View>
      <Text style={styles.titulo}>Criar Semana</Text>


      <View style={{backgroundColor: '#E0E0E0', padding: 20}}>

        <TasksListCarrossel
          tasks={tasks}
          renderCard={(task) => (<CardTask title={task.titulo} />)}
        />

      </View>

      <View style={styles.buttonsContainer}>

          <Link href="/create_task" asChild>
            <Pressable android_ripple={{ color: '#ddd' }} style={ styles.buttons }>
              <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
            </Pressable>
          </Link>

          <ButtonSuccess text="Salvar Semana" onPress={() => console.log('Salvar Tarefa')} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttons: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  }
});
