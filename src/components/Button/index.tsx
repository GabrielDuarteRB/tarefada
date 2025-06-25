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

export default function Button({ text = 'Confirmar', onPress, style } : props) {

  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
        <Text style={styles.confirmText}>{text}</Text>
    </Pressable>
  )

}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#E9E4EC',
    borderWidth: 1,
    borderColor: '#4C0B8C',
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: { color: '#000', fontSize: 16 },
});

