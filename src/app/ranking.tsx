import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { useWeekStore } from '../stores/weekStore';

import Loader from '../components/Loader';

export default function ResultadoScreen() {
  const router = useRouter();

  const navigation = useNavigation();

  const weekStore = useWeekStore();

  const {  ranking, getRanking } = weekStore;
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      (async () => {
          await getRanking()
          setLoading(false);
      })();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Loader />
      </View>
    );
  }

  if( ranking.length === 0) {
    return (
      <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
          Nenhum resultado disponível.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RESULTADO</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.trophyContainer}>
          <Image
            source={require('@/assets/images/trofeu.png')}
            resizeMode="contain"
          />
          <Text style={styles.vencedorTitle}>Vencedor</Text>

          <View style={{ gap: 10, marginTop: 10 }}>
            {ranking.map((user, index) => {
              const pos = parseInt(user.posicao, 10);
              const medalIcon = pos === 1
                ? '🥇'
                : pos === 2
                ? '🥈'
                : pos === 3
                ? '🥉'
                : '✅';

              return (
                <View key={user.id_usuario} style={styles.card}>
                  <View style={styles.cardRow}>
                    <Text style={{ fontSize: 18 }}>{medalIcon}</Text>
                    <Text style={styles.cardName}>{user.nome}</Text>
                    <Text style={styles.cardPoints}>pontos: {user.total_pontos}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  trophyContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trophy: {
    fontSize: 80,
    marginBottom: 10,
  },
  vencedorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    width: 250,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRowSecondary: {
    alignItems: 'flex-start',
  },
  cardName: {
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  segundoLabel: {
    fontSize: 14,
    color: '#555',
  },
  segundoName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardPoints: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2632b',
    padding: 16,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
});
