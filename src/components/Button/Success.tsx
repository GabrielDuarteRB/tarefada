import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle
} from 'react-native';

type props = {
  text?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export default function ButtonSuccess({ text = 'Confirmar', onPress, style } : props) {

  return (
    <Pressable style={[styles.confirmButton, style]} onPress={onPress}>
        <Text style={styles.confirmText}>{text}</Text>
    </Pressable>
  )

}
const styles = StyleSheet.create({
  confirmButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16 },
});

