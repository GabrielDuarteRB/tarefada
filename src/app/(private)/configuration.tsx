import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Configuration() {

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <Text style={styles.titulo}>CONFIGURAÇÃO </Text>

      <View style={styles.container}>
        <View style={styles.acao}>
          <View>
            <Text style={styles.tituloAcao}>Reiniciar semana</Text>
            <Text style={styles.subTituloAcao}>Excluir semana atual e suas tarefas</Text>
          </View>

          <Ionicons name="close-circle-outline" size={32} color="black" />

        </View>

        <View style={styles.acao}>
          <View>
            <Text style={styles.tituloAcao}>Auto Validação</Text>
            <Text style={styles.subTituloAcao}>As tarefas não precisam ser validadas pelo parceiro</Text>
          </View>

          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#007aff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

        </View>
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
  },
  container: {
    gap: 48,
    padding: 20
  },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tituloAcao: {
    fontSize: 20
  },
  subTituloAcao: {
    color: "#757575",
    fontSize: 16,
    width: 320
  }
});