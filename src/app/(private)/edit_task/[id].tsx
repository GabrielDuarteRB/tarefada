import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import FormsTask from '../../../components/Forms/Task';
import { useWeekStore } from '../../../stores/weekStore';
import { useTaskStore } from '../../../stores/taskStore';
import Toast from 'react-native-toast-message';
import Loader from '../../../components/Loader';
import { useLocalSearchParams } from 'expo-router';

export default function CreateTaks() {


  const { id } = useLocalSearchParams();

  const weekStore = useWeekStore();
  const navigation = useNavigation();

  const { week, currentWeek } = weekStore;
  const { task, findOneTask, normalUpdateTask } = useTaskStore();

  const [loading, setLoading] = useState(false)

  const handleSubmit = (dadosDoForm: any) => {

    const [dia, mes, ano] = dadosDoForm.data.split('/');

    const body = {
      titulo: dadosDoForm.nome,
      ponto: Number(dadosDoForm.pontos),
      data_inicio: `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
    }

    return normalUpdateTask(id, body)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Tarefa Atualizada!',
          text2: 'Entre nas tarefas para poder visualizar',
          position: 'top',
          visibilityTime: 3000,
          onHide: () => navigation.goBack(),
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Tente cadastrar novamente!',
        });
      });
  };

  useEffect(() => {
    async function fetchOneTask() {
      setLoading(true)
      await findOneTask(id);
      await currentWeek()
      setLoading(false)
    }

    fetchOneTask();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Loader />
        {/* <Text>Carregando semana...</Text> */}
      </View>
    );
  }


  return (
    <View>
      <Text style={styles.titulo}>Atualizar Tarefa</Text>

      <View style={{backgroundColor: '#E0E0E0', padding: 20}}>
        <FormsTask
          onSubmit={handleSubmit}
          week={week}
          initialDate={task.data_inicio}
          task={task}
        />
      </View>
      <Toast />
    </View>

  )

}

const styles = StyleSheet.create({
  titulo: {
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  }
});