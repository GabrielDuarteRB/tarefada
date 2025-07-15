import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormsTask from '../components/Forms/Task';
import { useWeekStore } from '../stores/weekStore';
import { useTaskStore } from '../stores/taskStore';

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
        console.log('Tarefa criada com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao criar tarefa:', error);
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