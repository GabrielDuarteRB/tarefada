import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import TasksCarrossel from '../../../../components/Tasks/Carrossel';
import TasksListCarrossel from '../../../../components/Tasks/ListCarrossel';
import ButtonSuccess from '../../../../components/Button/Success';
import CardTask from '../../../../components/Cards/Task';
import { useTaskStore } from '../../../../stores/taskStore';
import Loader from '../../../../components/Loader';

export default function Tasks() {
  const { id, date } = useLocalSearchParams();

  const taskStore = useTaskStore();
  const { tasks, findTasks, resetTasks } = taskStore;

  const [cards, setCards] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      resetTasks(); // Limpa as tarefas antes de buscar
      const params = { id_semana: id, data_inicio: date };
      await findTasks(params);
      setLoading(false);
    }
    fetchTasks();
  }, [id, date]); // Busca novamente se id ou date mudar

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Loader />
        {/* <Text style={{ fontSize: 18, marginBottom: 16 }}>Carregando tarefas...</Text> */}
      </View>
    );
  }

  if (!tasks.length) {
    return (
      <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
          Nenhuma tarefa encontrada para esta data.
        </Text>

        <View style={ styles.buttonContainer }>
        <Link href="/create_task" asChild>
          <Pressable android_ripple={{ color: '#ddd' }} style={ styles.button }>
            <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
          </Pressable>
        </Link>

        <Link href="/tasks/validate" asChild>
            <ButtonSuccess text="Tarefas a validar" />
        </Link>
      </View>
      </View>
    );
  }

  return (
    <View >
      <Text style={styles.titulo}>TAREFAS</Text>
      <Text style={styles.subtitulo}>Segunda</Text>

      <View style={styles.container}>
        <View style={{ minHeight: 400, justifyContent: 'center' }}>
          {
            cards ?
              <TasksCarrossel tasks={tasks} />
            :
              <TasksListCarrossel
                tasks={tasks}
                renderCard={(task) => (<CardTask title={task.titulo} />)}
              />
          }
        </View>

        <View style={styles.containerIcons}>
          <Link href="/" asChild>
            <Pressable style={styles.wrapperIcons}>
              <Ionicons name="calendar-outline" size={24} ></Ionicons>
              <Text style={styles.descricaoIcons}>Semana</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.wrapperIcons} onPress={() => setCards(!cards)}>
            <Ionicons name="list-outline" size={24}></Ionicons>
            <Text style={styles.descricaoIcons}>Lista</Text>
          </Pressable>
        </View>
      </View>

      <View style={ styles.buttonContainer }>
        <Link href="/create_task" asChild>
          <Pressable android_ripple={{ color: '#ddd' }} style={ styles.button }>
            <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
          </Pressable>
        </Link>

        <Link href="/tasks/validate" asChild>
            <ButtonSuccess text="Tarefas a validar" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  wrapperIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  descricaoIcons: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginLeft: 20,
    marginTop: 20,
    padding: 14,
    width: '40%',
  }
});
