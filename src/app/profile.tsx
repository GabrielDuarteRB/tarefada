import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '../stores/userStore';
import { useWeekStore } from '../stores/weekStore';

export default function TelaPerfil() {

  const userStore = useUserStore();
  const weekStore = useWeekStore();

  const [codigoSemana, setCodigoSemana] = React.useState('');

  const { user } = userStore;
  const { week, currentWeek, deleteCurrentWeek } = weekStore;

  const confirmarDesvinculo = () => {
    Alert.alert(
      'Desvincular Semana',
      'Tem certeza que deseja se desvincular desta semana?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Desvincular',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCurrentWeek();
              Toast.show({
                type: 'success',
                text1: 'Desvinculado',
                text2: 'Você foi desvinculado da semana atual.',
                visibilityTime: 3000,
              });

            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Erro ao desvincular',
                text2: 'Tente novamente mais tarde.',
                visibilityTime: 3000,
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const entrarSemana = async (id: number) => {
    try {
      await weekStore.participatedWeek(id);
      weekStore.currentWeek();
      Toast.show({
        type: 'success',
        text1: 'Vincluado',
        text2: 'Você foi vinculado a uma semana!',
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Código inválido',
        text2: 'Digite um número válido para a semana.',
      });
    }
  }



  useEffect(() => {
    if(user) {
      currentWeek();
    }
  }, [user]);

  if (!user) {
    return <Text>Carregando perfil...</Text>;
  }

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
            {week?.id_semana ? (
              <>
                <Text style={styles.parceiroText}>Semana: {week.id_semana}</Text>
                <TouchableOpacity style={styles.desvincularBtn} onPress={confirmarDesvinculo}>
                  <MaterialIcons name="link-off" size={16} color="#ff7b00" />
                  <Text style={styles.desvincularText}>desvincular</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.parceiroText}>Sem semana atual</Text>
                <View style={{ flexDirection: 'column', gap: 8 }}>
                <Text style={styles.parceiroText}>Digite o ID da semana:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TextInput
                    style={styles.input}
                    value={codigoSemana}
                    onChangeText={setCodigoSemana}
                    placeholder="Ex: 123"
                    keyboardType="numeric"
                    placeholderTextColor="#aaa"
                  />
                  <TouchableOpacity
                    style={styles.desvincularBtn}
                    onPress={() => {
                      const id = parseInt(codigoSemana);

                      entrarSemana(id);
                    }}
                  >
                    <MaterialIcons name="add" size={16} color="#ff7b00" />
                    <Text style={styles.desvincularText}>Entrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </>
            )}
          </View>

      </View>

      <Toast />
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
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#000',
    height: 36,
    width: 100,
  },

});

