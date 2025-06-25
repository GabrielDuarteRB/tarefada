import { useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import ButtonSuccess from '../components/Button/Success';
import TasksListCarrossel from '../components/Tasks/ListCarrossel';
import CardTask from '../components/Cards/Task';

const ITEM_HEIGHT = 80;

export default function CreateWeek() {
  const tasks = [
    { id: 1, titulo: 'Tarefa 1', completed: false },
    { id: 2, titulo: 'Tarefa 2', completed: true },
    { id: 3, titulo: 'Tarefa 3', completed: false },
    { id: 4, titulo: 'Tarefa 4', completed: true },
    { id: 5, titulo: 'Tarefa 5', completed: false },
    { id: 6, titulo: 'Tarefa 6', completed: true },
    { id: 7, titulo: 'Tarefa 7', completed: false },
    { id: 8, titulo: 'Tarefa 8', completed: true },
    { id: 9, titulo: 'Tarefa 9', completed: false },
  ];

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
