import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type props = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export default function ValidateTasksButton({ onPress, style } : props) {

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textLine1}>tarefas</Text>
          <Text style={styles.textLine2}>a validar</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={18} color="white" />
        </View>
      </View>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  textLine1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 16,
  },
  textLine2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 16,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6B46C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 