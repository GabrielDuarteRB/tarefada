import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormsTask from '../components/Forms/Task';
import { useWeekStore } from '../stores/weekStore';
import { useTaskStore } from '../stores/taskStore';
import Toast from 'react-native-toast-message';

export default function CreateTaks() {

  const weekStore = useWeekStore();
  const { week, currentWeek, createWeek } = weekStore;
  const { createTaks } = useTaskStore();


  const handleSubmit = (dadosDoForm: any) => {

    const [dia, mes, ano] = dadosDoForm.data.split('/');

    const body = {
      id_semana: week.id_semana,
      titulo: dadosDoForm.nome,
      ponto: dadosDoForm.pontos,
      data_inicio: `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
    }

    createTaks(body)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Tarefa criada!',
          text2: 'Você pode cadastrar outra se quiser.'
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
    async function fetchAndCreateWeek() {
      await currentWeek();
    }

    fetchAndCreateWeek();
  }, []);

  if (!week?.data_inicio) {
    return <Text>Carregando semana...</Text>;
  }


  return (
    <View>
      <Text style={styles.titulo}>Criar Tarefa</Text>

      <View style={{backgroundColor: '#E0E0E0', padding: 20}}>
        <FormsTask onSubmit={handleSubmit} week={week} />
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