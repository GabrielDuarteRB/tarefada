import { StyleSheet, Animated, View, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useRef, useState, useEffect, useCallback } from 'react';
import CardWeek from '../components/Cards/Week';
import { useWeekStore } from '../stores/weekStore';
import { useTaskStore } from '../stores/taskStore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


function gerarSeteDias(inicio: Date): { data: string; semana: string }[] {
  const datas = [];
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  for (let i = 0; i < 7; i++) {
    const data = new Date(inicio);
    data.setDate(inicio.getDate() + i);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const nomeSemana = diasSemana[data.getDay()];

    datas.push({ data: `${dia}/${mes}`, semana: nomeSemana });
  }

  return datas;
}

export default function Index() {

  const weekStore = useWeekStore();
  const taskStore = useTaskStore();
  const router = useRouter();

  type Week = {
    id_semana: number;
    data_inicio: string;
    data_previsao_fim: string;
    [key: string]: any;
  };
  const { week, currentWeek } = weekStore as { week: Week | {}; currentWeek: () => Promise<void> };
  const { tasks, findTasks } = taskStore;

  const [dias, setDias] = useState<{ data: string; semana: string }[]>([])
  const [loading, setLoading] = useState(true);

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

  function criarDataLocal(dateStr: string): Date {
    const [ano, mes, dia] = dateStr.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      (async () => {
        const token = await AsyncStorage.getItem('@token');

        if (!token) {
          router.replace('/login');
          return;
        }

        await currentWeek();
        setLoading(false);
      })();
    }, [])
  );

  useEffect(() => {
    if(week && Object.keys(week).length > 0) {
      if ('data_inicio' in week && 'data_previsao_fim' in week) {
        const dataInicio = criarDataLocal(week.data_inicio);
        const intervalo = gerarSeteDias(dataInicio)
        setDias(intervalo);
      }
    }
  }, [week]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Loader />
        {/* <Text style={{ marginTop: 8 }}>Carregando semana…</Text> */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
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
                  id={'id_semana' in week ? week.id_semana : 0}
                  date={montarDataISO(dias[proximoIndex].data, 'data_inicio' in week ? week.data_inicio : '')}
                />
              </Animated.View>
              <Animated.View
                style={[{ position: 'absolute', transform: [{ translateX: animProximo }] }]}
              >
                <CardWeek
                  weekName={`${dias[proximoIndex].semana} - ${dias[proximoIndex].data}`}
                  id={'id_semana' in week ? week.id_semana : 0}
                  date={montarDataISO(dias[proximoIndex].data, 'data_inicio' in week ? week.data_inicio : '')}
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
      
    </ScrollView>
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
  loader: {
    width: 50,
    height: 50,
    backgroundColor: '#514b82',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});
