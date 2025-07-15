import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskInterface } from '../../types/TaskInterface';
import * as ImagePicker from 'expo-image-picker';
import { useTaskStore } from '../../stores/taskStore';
import { useUserStore } from '../../stores/userStore';
import { useNavigation } from '@react-navigation/native';

type props = {
  task: TaskInterface
};

export default function DetalheTarefa({ task }: props) {

  const taskStore = useTaskStore();
  const userStore = useUserStore();
  const navigation = useNavigation();

  const { updateTask } = taskStore;
  const { user } = userStore;

  const contants = {
    "em andamento": {
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
    "finalizado": {
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

  const constantsUsed = contants[task.status];

  function formatarDataBR(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  async function handleEnviarComprovante() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'É necessário permitir o acesso à galeria para enviar um comprovante.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false
    });

    if (result.canceled) {
      Alert.alert('Cancelado', 'Nenhuma imagem foi selecionada.');
      return;
    }

    console.log('Imagem selecionada:', result);
    const asset = result.assets[0];


    try {

      const formData = new FormData();

      formData.append('comprovante', asset.file);
      formData.append('id_usuario_atribuido', user.id_usuario);
      formData.append('status', 'pendente');
      const body = {
        comprovante: asset,
        id_usuario_atribuido: user.id_usuario,
        status: 'pendente',
      };

      updateTask(task.id_tarefa, formData)

      console.log('Enviando comprovante:', body);
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar o comprovante.');
      console.error(error);
    }
  }

  return (
    <View
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

      <View style={[styles.cardDivider, { borderBottomColor: constantsUsed.text }]} />

      <TouchableOpacity
        style={[
          styles.comprovanteBtn,
          { backgroundColor: constantsUsed.borderCard }
        ]}
        onPress={handleEnviarComprovante}
      >
        <Text style={[styles.comprovanteText, { color: constantsUsed.text }]}>{constantsUsed.textButton}</Text>
        <MaterialIcons name={constantsUsed.iconButton} size={18} color={constantsUsed.text} />
      </TouchableOpacity>
    </View>
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
});
