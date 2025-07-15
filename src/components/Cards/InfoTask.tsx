import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskInterface } from '../../types/TaskInterface';
import * as ImagePicker from 'expo-image-picker';
import { useTaskStore } from '../../stores/taskStore';
import { useUserStore } from '../../stores/userStore';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import * as Sharing from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';

type props = {
  task: TaskInterface
};

export default function DetalheTarefa({ task }: props) {

  const taskStore = useTaskStore();
  const userStore = useUserStore();
  const navigation = useNavigation();

  const { updateTask } = taskStore;
  const { user } = userStore;

  const [isUploading, setIsUploading] = useState(false);

  const contants = {
    "recusada": {
      bodyCard: "#5f019a",
      borderCard: "#f97316",
      text: "#fff",
      textButton: "Comprovante",
      iconButton: "add-to-photos"
    },
    "não concluída": {
      bodyCard: "#5f019a",
      borderCard: "#f97316",
      text: "#fff",
      textButton: "Comprovante",
      iconButton: "add-to-photos"
    },
    "concluida": {
      bodyCard: "#F2620E",
      borderCard: "#5f019a",
      text: "#000",
      textButton: "Abrir Comprovante",
      iconButton: "open-in-new",
    },
    "pendente": {
      bodyCard: "#F2620E",
      borderCard: "#5f019a",
      text: "#000",
      textButton: "Abrir Comprovante",
      iconButton: "open-in-new",
    },
  };

  const constantsUsed = contants[task.status as keyof typeof contants];

  const ehDono = task.id_usuario_atribuido === user.id_usuario;
  const temDono = task.id_usuario_atribuido !== null && task.id_usuario_atribuido !== undefined;

  function formatarDataBR(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  async function handleEnviarComprovante() {
    if (isUploading) {
      console.log('Upload em andamento, ignorando clique');
      return;
    }
    setIsUploading(true);

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'É necessário permitir o acesso à galeria para enviar um comprovante.',
          [{ text: 'OK' }]
        );
        return;
      }

      const { canceled, assets} = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false
      });

      if (canceled) {
        Alert.alert('Cancelado', 'Nenhuma imagem foi selecionada.');
        return;
      }

      const file = assets[0];
      const fileName = file.uri.split('/').pop(); // "4326456d-...jpeg"
      const extension = fileName?.split('.').pop()?.toLowerCase();

      const formData = new FormData();

      console.log({
        uri: assets[0].uri,
        name: fileName,
        type: 'image/' + extension
      })
      formData.append('comprovante', {
        uri: assets[0].uri,
        name: fileName,
        type: 'image/' + extension,
      } as any);
      formData.append('id_usuario_atribuido', String(user.id_usuario));
      formData.append('status', 'pendente');

      await updateTask(task.id_tarefa, formData);

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Tarefa concluida com sucesso! 👏',
        position: 'top',
        visibilityTime: 3000,
        onHide: () => {
          navigation.goBack();
        }
      });

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar o comprovante.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAceitarOuRecusarTarefa(status: 'concluida' | 'recusada', toatstMessage: string) {
    try {
      await updateTask(task.id_tarefa, {
        status,
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: toatstMessage,
        position: 'top',
        visibilityTime: 3000,
        onHide: () => {
          navigation.goBack();
        }
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível aceitar a tarefa.');
      console.error(error);
    }
  }


  async function abrirComprovante(base64: string | null) {
    if (!base64) {
      Alert.alert('Erro', 'Nenhum comprovante foi enviado.');
      return;
    }

    try {
      const caminho = `${FileSystem.cacheDirectory}comprovante.jpg`;
      await FileSystem.writeAsStringAsync(caminho, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(caminho);
      } else {
        Alert.alert('Erro', 'Recurso de compartilhamento indisponível.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro ao tentar abrir o comprovante.');
      console.error(err);
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.card,
        {
          backgroundColor: constantsUsed.bodyCard,
          borderColor: constantsUsed.borderCard,
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: constantsUsed.text }]}>{task.titulo}</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.cardNumero, { color: constantsUsed.text }]}>{task.id_tarefa}</Text>
          <Text style={[styles.spade, { color: constantsUsed.text }]}>♠</Text>
        </View>
      </View>

      <Text style={[styles.cardText, { color: constantsUsed.text }]}>Dia: {formatarDataBR(task.data_inicio)}</Text>
      <Text style={[styles.cardText, { color: constantsUsed.text }]}>Status: {task.status}</Text>
      <Text style={[styles.cardText, { color: constantsUsed.text }]}>
        Atribuído:{' '}
        {task.id_usuario_atribuido === null || task.id_usuario_atribuido === undefined
          ? 'Sem atribuição'
          : task.id_usuario_atribuido === user.id_usuario
          ? 'Esta tarefa é sua'
          : 'Pertence a outro participante'}
      </Text>

      <View style={[styles.cardDivider, { borderBottomColor: constantsUsed.text }]} />

      <TouchableOpacity
        style={[
          styles.comprovanteBtn,
          { backgroundColor: constantsUsed.borderCard }
        ]}
        onPress={() => {
          if (ehDono && task.status === 'recusada') {
            handleEnviarComprovante();
          } else if (temDono || task.status === 'pendente') {
            abrirComprovante(task.comprovante || null);
          } else {
            handleEnviarComprovante();
          }
        }}
        disabled={isUploading}
      >
        <Text style={[styles.comprovanteText, { color: constantsUsed.text }]}>
          {constantsUsed.textButton}
        </Text>
        <MaterialIcons name={constantsUsed.iconButton as any} size={18} color={constantsUsed.text} />
      </TouchableOpacity>

      {task.id_usuario_atribuido !== user.id_usuario && task.status === 'pendente' && (
        <>
          <TouchableOpacity
            style={[styles.aceitarBtn, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleAceitarOuRecusarTarefa('concluida', 'Tarefa aceita com sucesso! 👏')}
          >
            <Text style={styles.aceitarText}>Aceitar Tarefa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.recusarBtn, { backgroundColor: '#D32F2F', marginTop: 10 }]}
            onPress={() => handleAceitarOuRecusarTarefa('recusada', 'Tarefa recusada com sucesso!')}
          >
            <Text style={styles.recusarText}>Recusar Tarefa</Text>
          </TouchableOpacity>
        </>
      )}
    <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginTop: 10,
    minHeight: 450,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  spade: {
    fontSize: 48,
  },
  cardNumero: {
    fontSize: 14,
  },
  cardText: {
    fontSize: 16,
    marginTop: 8,
  },
  cardDivider: {
    borderBottomWidth: 1,
    marginVertical: 36,
  },
  comprovanteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
  comprovanteText: {
    fontWeight: 'bold',
  },
  enviarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 6,
    borderWidth: 2,
  },
  enviarText: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  aceitarBtn: {
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  aceitarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recusarBtn: {
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },

  recusarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
