import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert
  ScrollView,
} from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import TasksCarrossel from '../../../../../components/Tasks/Carrossel';
import TasksListCarrossel from '../../../../../components/Tasks/ListCarrossel';
import ButtonSuccess from '../../../../../components/Button/Success';
import CardTask from '../../../../../components/Cards/Task';
import { useTaskStore } from '../../../../../stores/taskStore';
import Loader from '../../../../../components/Loader';
import { TaskInterface } from '../../../../../types/TaskInterface';
export default function Tasks() {
  const { id, date } = useLocalSearchParams();

  const taskStore = useTaskStore();
  const { tasks, findTasks, resetTasks, deleteTask } = taskStore;

  const [cards, setCards] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleExcluir = (taskId) =>  {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir esta tarefa?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              await deleteTask(taskId);
              await fetchTasks()
            },
          },
        ],
        { cancelable: true }
      );
  }

  const fetchTasks = async () => {
    setLoading(true);
    resetTasks();
    const params = { id_semana: id, data_inicio: date };
    await findTasks(params);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [id, date])
  );


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
        <Link href={`/create_task?date=${date}`} asChild>
          <Pressable android_ripple={{ color: '#ddd' }} style={ styles.button }>
            <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
          </Pressable>
        </Link>

        <Link href={`/tasks/week/${id}/${date}/validate`} asChild>
            <ButtonSuccess text="Tarefas a validar" />
        </Link>
      </View>
      </View>
    );
  }

  // Filtrar tarefas: não mostrar pendentes, e só mostrar concluídas se showCompleted for true
  const filteredTasks = (tasks as TaskInterface[]).filter((task) => {
    if (task.status === 'pendente') return false;
    if (task.status === 'concluida' && !showCompleted) return false;
    return true;
  });

  if (!filteredTasks.length) {
    return (
      <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
          Nenhuma tarefa disponível para esta data (todas aguardando validação).
        </Text>
        <View style={ styles.buttonContainer }>
          <Link href={`/create_task?date=${date}`} asChild>
            <Pressable android_ripple={{ color: '#ddd' }} style={ styles.button }>
              <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
            </Pressable>
          </Link>
          <Link href={`/tasks/week/${id}/${date}/validate`} asChild>
            <ButtonSuccess text="Tarefas a validar" />
          </Link>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
      <Text style={styles.titulo}>TAREFAS</Text>
      <Text style={styles.subtitulo}>
        {new Date(`${date}T12:00:00`)
          .toLocaleDateString('pt-BR', { weekday: 'long' })
          .replace(/^./, (c) => c.toUpperCase())}
      </Text>

      

      <View style={styles.container}>
        {/* Checkbox para mostrar tarefas concluídas */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
        <Switch
          value={showCompleted}
          onValueChange={setShowCompleted}
        />
        <Text style={{ marginLeft: 8 }}>tarefas concluídas</Text>
      </View>
        <View style={{ minHeight: 300, justifyContent: 'center' }}>
          {
            cards ?
              <TasksCarrossel tasks={filteredTasks} />
            :
              <TasksListCarrossel
                tasks={filteredTasks}
                renderCard={(task) => (
                    <CardTask
                      handleExcluir={handleExcluir}
                      id={task.id_tarefa}
                      title={task.titulo}
                    />
                  )}
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
            <Text style={styles.descricaoIcons}>{cards ? 'Lista' : 'Cartas'}</Text>
          </Pressable>
        </View>
      </View>

      <View style={ styles.buttonContainer }>
        <Link href={`/create_task?date=${date}`} asChild>
          <Pressable android_ripple={{ color: '#ddd' }} style={ styles.button }>
            <Text style={{color: 'white'}} >Adicionar Tarefa</Text>
          </Pressable>
        </Link>

        <Link href={`/tasks/week/${id}/${date}/validate`} asChild>
            <ButtonSuccess text="Tarefas a validar" />
        </Link>
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#E0E0E0',
    //paddingHorizontal: 16,
    //paddingVertical: 24,
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    //paddingVertical: 10,
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
