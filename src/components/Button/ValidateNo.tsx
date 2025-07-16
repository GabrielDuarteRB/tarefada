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

export default function ValidateNoButton({ onPress, style } : props) {

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textLine1}>Não validar</Text>
          <Text style={styles.textLine2}>invalidar tarefa e voltar status</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="close" size={20} color="#D32F2F" />
        </View>
      </View>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 20,
  },
  textLine2: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000',
    lineHeight: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
}); 