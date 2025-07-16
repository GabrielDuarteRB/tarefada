import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

type props = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export default function AddTaskButton({ onPress, style } : props) {

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={Platform.OS === 'ios' ? 'add' : 'add'} 
          size={20} 
          color="white" 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLine1}>adicionar</Text>
        <Text style={styles.textLine2}>tarefa</Text>
      </View>
    </Pressable>
  )

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'transparent',
    minHeight: 48,
    minWidth: 120,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    borderWidth: 1,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  textLine1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textLine2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
}); 