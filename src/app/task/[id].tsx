import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import CardsInfoTask from '../../components/Cards/InfoTask';
import ButtonSuccess from '../../components/Button/Success';
import Button from '../../components/Button';

import { useTaskStore } from '../../stores/taskStore';

export default function DetalheTarefa() {
  const { id } = useLocalSearchParams();

  const taskStore = useTaskStore();
  const { task, findOneTask } = taskStore;

  useEffect(() => {
    findOneTask(id)
  }, []);


  if (Object.keys(task).length === 0) {
    return <Text>Carregando tarefa...</Text>;
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <Text style={styles.title}>TAREFA</Text>

        <View style={styles.statusBox}>
          <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#D9D9D9" />
          <Text style={styles.statusText}>status</Text>
          <View style={styles.pointsBox}>
            <Text style={styles.pointsValue}>{ task?.ponto }</Text>
            <Text style={styles.pointsLabel}>pontos</Text>
          </View>
        </View>
      </View>

      <CardsInfoTask task={task} />

      { task.status === 'Em andamento' && (
        <TouchableOpacity style={styles.okButton}>
          <ButtonSuccess text="enviar para validação" />
        </TouchableOpacity>
      )}
      { task.status === 'Finalizado' && (
        <View style={styles.btns}>
          <Button
            text="Tarefa Invalida"
            style={styles.invalidbtn}
          />
          <ButtonSuccess
            text="Validar tarefa"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
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
  statusBox: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  pointsBox: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#777',
  },
  card: {
    borderColor: '#f97316',
    borderWidth: 3,
    backgroundColor: '#5f019a',
    borderRadius: 12,
    justifyContent: 'space-between',
    marginTop: 10,
    minHeight: 450,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardNumero: {
    color: '#fff',
    fontSize: 14,
  },
  spade: {
    fontSize: 48,
    color: '#fff',
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  cardDivider: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginVertical: 36,
  },
  comprovanteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 6,
  },
  comprovanteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  okButton: {
    marginTop: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  invalidbtn: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
