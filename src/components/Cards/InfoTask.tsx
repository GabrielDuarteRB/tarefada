import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TaskInterface } from '../../types/TaskInterface';

type props = {
  task: TaskInterface
};

export default function DetalheTarefa({ task }: props) {
  const contants = {
    "Em andamento": {
      bodyCard: "#5f019a",
      borderCard: "#f97316",
      text: "#fff",
      textButton: "Comprovante",
      iconButton: "add-to-photos"
    },
    "Finalizado": {
      bodyCard: "#F2620E",
      borderCard: "#5f019a",
      text: "#000",
      textButton: "Abrir Comprovante",
      iconButton: "open-in-new",
    }
  };

  const constantsUsed = contants[task.status];

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
          <Text style={[styles.cardNumero, { color: constantsUsed.text }]}>01</Text>
          <Text style={[styles.spade, { color: constantsUsed.text }]}>♠</Text>
        </View>
      </View>

      <Text style={[styles.cardText, { color: constantsUsed.text }]}>3 dias (seg, qua, sex)</Text>
      <Text style={[styles.cardText, { color: constantsUsed.text }]}>recorrente</Text>
      <Text style={[styles.cardText, { color: constantsUsed.text }]}>observação</Text>

      <View style={[styles.cardDivider, { borderBottomColor: constantsUsed.text }]} />

      <TouchableOpacity
        style={[
          styles.comprovanteBtn,
          { backgroundColor: constantsUsed.borderCard }
        ]}
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
  },
  comprovanteText: {
    fontWeight: 'bold',
  },
});
