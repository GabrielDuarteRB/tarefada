import { View, Text, StyleSheet } from 'react-native';
import FormsTask from '../components/Forms/Task';

export default function CreateTaks() {

  return (
    <View>
      <Text style={styles.titulo}>Criar Tarefa</Text>

      <View style={{backgroundColor: '#E0E0E0', padding: 20}}>
        <FormsTask />
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