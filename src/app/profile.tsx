import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '../stores/userStore';
import { useWeekStore } from '../stores/weekStore';

export default function TelaPerfil() {

  const userStore = useUserStore();
  const weekStore = useWeekStore();

  const { user } = userStore;
  const { week, currentWeek } = weekStore;

  const nome = "Nome Pessoa";
  const id = "332211";
  const parceiro = "Fulano dois";

  useEffect(() => {
    if(user) {
      currentWeek();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>PERFIL</Text>

      <View style={styles.card}>

        <View style={styles.iconePessoa}>
          <MaterialIcons name="person" size={60} color="#ff7b00" />
        </View>

        <Text style={styles.nome}>{user.nome}</Text>
        <Text style={styles.id}>id: {user.id_usuario}</Text>
        <View style={styles.divisor} />

        <View style={styles.parceiroContainer}>
          <Text style={styles.parceiroText}>Semana: {week.id_semana}</Text>

          <TouchableOpacity style={styles.desvincularBtn}>
            <MaterialIcons name="link-off" size={16} color="#ff7b00" />
            <Text style={styles.desvincularText}>desvincular</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#4B0082',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f97316',
    padding: 20,
    position: 'relative',
  },
  editarBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconePessoa: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nome: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  id: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  divisor: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  parceiroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parceiroText: {
    color: '#fff',
    fontSize: 14,
  },
  desvincularBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desvincularText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});

