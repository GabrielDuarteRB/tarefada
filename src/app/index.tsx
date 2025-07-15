import { StyleSheet, Animated, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import CardWeek from '../components/Cards/Week';
import { useWeekStore } from '../stores/weekStore';
import { useTaskStore } from '../stores/taskStore';


function gerarIntervaloDeDatas(inicio: Date, fim: Date): { data: string; semana: string }[] {
  const datas = [];
  const dataAtual = new Date(inicio);
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  while (dataAtual <= fim) {
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const nomeSemana = diasSemana[dataAtual.getDay()];

    datas.push({ data: `${dia}/${mes}`, semana: nomeSemana });
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  return datas;
}

export default function Index() {

  const weekStore = useWeekStore();
  const taskStore = useTaskStore();

  const { week, currentWeek } = weekStore;
  const { tasks, findTasks } = taskStore;

  const [dias, setDias] = useState([])

  const hoje = new Date();
  const hojeFormatado = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const indexHoje = dias.findIndex((dia) => dia.data === hojeFormatado);

  const [indexAtual, setIndexAtual] = useState(indexHoje !== -1 ? indexHoje : 0);
  const [proximoIndex, setProximoIndex] = useState(indexAtual);

  const animAtual = useRef(new Animated.Value(0)).current;
  const animProximo = useRef(new Animated.Value(300)).current;

  const animar = (direction: 'left' | 'right') => {
    const direcao = direction === 'left' ? 1 : -1;
    const novoIndex = indexAtual + direcao;

    if (novoIndex < 0 || novoIndex >= dias.length) return;

    setProximoIndex(novoIndex);

    animProximo.setValue(direcao * 300);
    animAtual.setValue(0);

    Animated.parallel([
      Animated.timing(animAtual, {
        toValue: -direcao * 300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animProximo, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndexAtual(novoIndex);
    });
  };

  function montarDataISO(diaMes: string, referenciaISO: string): string {
    const [dia, mes] = diaMes.split('/');
    const [ano] = referenciaISO.split('-');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  useEffect(() => {
    currentWeek();
  }, []);

  useEffect(() => {
    if(week && Object.keys(week).length > 0) {
      const intervalo = gerarIntervaloDeDatas(new Date(week.data_inicio), new Date(week.data_previsao_fim))
      setDias(intervalo);
    }
  }, [week]);

  if (!dias.length) {
    return (
      <View >
        <Text style={{ marginTop: 8 }}>Carregando semana…</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titulo}>Semanas</Text>

      {Object.keys(week).length > 0 ? (
        <View style={styles.cardWeek}>
          <TouchableOpacity onPress={() => animar('right')} disabled={indexAtual === 0}>
            <Ionicons
              name="chevron-back-outline"
              size={48}
              color={indexAtual === 0 ? '#ccc' : 'black'}
            />
          </TouchableOpacity>

          <View style={{ overflow: 'hidden' }}>
            <Animated.View style={[{ transform: [{ translateX: animAtual }] }]}>
              <CardWeek
                weekName={`${dias[indexAtual].semana} - ${dias[indexAtual].data}`}
                id={week.id_semana}
                date={montarDataISO(dias[proximoIndex].data, week.data_inicio)}
              />
            </Animated.View>
            <Animated.View
              style={[{ position: 'absolute', transform: [{ translateX: animProximo }] }]}
            >
              <CardWeek
                weekName={`${dias[proximoIndex].semana} - ${dias[proximoIndex].data}`}
                id={week.id_semana}
                date={montarDataISO(dias[proximoIndex].data, week.data_inicio)}
              />
            </Animated.View>
          </View>

          <TouchableOpacity
            onPress={() => animar('left')}
            disabled={indexAtual === dias.length - 1}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={48}
              color={indexAtual === dias.length - 1 ? '#ccc' : 'black'}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 32 }}>
          <Text style={{ fontSize: 24, alignItems: 'center' }}>Nenhuma semana ainda :(</Text>
          <Text style={{ fontSize: 24 }}>crie uma nova!</Text>
          <Link href="/create_week" asChild>
            <Pressable android_ripple={{ color: '#ddd' }} style={{ padding: 4 }}>
              <Ionicons name="add-circle" size={48} color="#4C0B8C" />
            </Pressable>
          </Link>
        </View>

      )}

    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  cardWeek: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
