import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import InputMultipleSelect from '../Input/MultipleSelect';
import ButtonSuccess from '../Button/Success';

export default function FormsTask() {

  const [nome, setNome] = useState('');
  const [pontos, setPontos] = useState('');

  return (
    <View>
      <View style={styles.containerInputs}>
        <Text style={styles.label}>Nome da Tarefa</Text>
        <TextInput
          placeholder="Digite o nome da tarefa"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
      </View>

      <View style={styles.containerInputs}>
        <Text style={styles.label}>Dias na Semana</Text>
        <InputMultipleSelect
          options={['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']}
          placeholder="Selecione os dias"
        />
      </View>

      <View>
        <Text>Pontos:</Text>
        <TextInput
          value={pontos}
          onChangeText={setPontos}
          keyboardType="numeric"
          placeholder="Pontos"
          style={styles.input}
        />
      </View>

      <ButtonSuccess text="Salvar Tarefa" onPress={() => alert('salvar tarefa')} />
    </View>
  )

}

const styles = StyleSheet.create({
  containerInputs: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});