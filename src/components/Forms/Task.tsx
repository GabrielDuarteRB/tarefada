import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import ButtonSuccess from '../Button/Success';

export default function FormsTask({ onSubmit, week, initialDate }: any) {

  const [nome, setNome] = useState('');
  const [pontos, setPontos] = useState('');
  // Se initialDate vier no formato YYYY-MM-DD, converter para DD/MM/YYYY
  let initialDia = '';
  if (initialDate && typeof initialDate === 'string' && initialDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [ano, mes, dia] = initialDate.split('-');
    initialDia = `${dia}/${mes}/${ano}`;
  }
  const [dia, setDia] = useState(initialDia);
  // Atualizar o campo dia sempre que initialDate mudar
  useEffect(() => {
    let newDia = '';
    if (initialDate && typeof initialDate === 'string' && initialDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [ano, mes, dia] = initialDate.split('-');
      newDia = `${dia}/${mes}/${ano}`;
    }
    setDia(newDia);
  }, [initialDate]);
  const [erro, setErro] = useState('');

  const formatarDataBR = (dataISO: string) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const parseISODateLocal = (iso: string) => {
    const [ano, mes, dia] = iso.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  };

  const handleSubmit = () => {
    setErro('');

    if (!nome.trim()) {
      setErro('Informe o nome da tarefa.');
      return;
    }

    if (!dia) {
      setErro('Informe a data da tarefa.');
      return;
    }

    const partes = dia.split('/');
    if (partes.length !== 3) {
      setErro('Data inválida. Use o formato DD/MM/YYYY.');
      return;
    }

    const [diaStr, mesStr, anoStr] = partes;
    const dataTarefa = new Date(Number(anoStr), Number(mesStr) - 1, Number(diaStr));
    if (isNaN(dataTarefa.getTime())) {
      setErro('Data inválida.');
      return;
    }


    const dataInicio = parseISODateLocal(week.data_inicio);
    const dataFim    = parseISODateLocal(week.data_previsao_fim);

    if (dataTarefa < dataInicio || dataTarefa > dataFim) {
      setErro(
        `A data da tarefa deve estar entre ${formatarDataBR(week.data_inicio)} e ${formatarDataBR(week.data_previsao_fim)}.`
      );
      return;
    }

    if (!pontos || isNaN(Number(pontos)) || Number(pontos) <= 0) {
      setErro('Informe um valor válido para pontos.');
      return;
    }

    onSubmit({
      nome,
      pontos: Number(pontos),
      data: dia,
    });

    setNome('');
    setPontos('');
    setDia('');
  };

  return (
    <View>
      {!!erro && (
        <Text style={styles.erro}>{erro}</Text>
      )}

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
        <Text>Dia da tarefa:</Text>
        <TextInput
          value={dia}
          onChangeText={setDia}
          placeholder="DD/MM/YYYY"
          style={styles.input}
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

      <ButtonSuccess text="Salvar Tarefa" onPress={handleSubmit} />
    </View>
  );
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
  erro: {
    color: 'red',
    marginBottom: 10,
  }
});
