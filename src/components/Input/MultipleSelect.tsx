import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ButtonSuccess from '../Button/Success';

type props = {
  options?: string[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
};

export default function MultiSelectPicker({  options = [], placeholder = 'Selecione...', onChange } : props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => {
      let newSelected = [];
      if (prev.includes(option)) {
        newSelected = prev.filter(item => item !== option);
      } else {
        newSelected = [...prev, option];
      }

      if (onChange) onChange(newSelected);
      return newSelected;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Escolha opções</Text>
          <ScrollView>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => toggleOption(option)}
              >
                <Text style={styles.optionText}>
                  {selectedOptions.includes(option) ? '✅ ' : '⬜ '} {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ButtonSuccess  onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 8,
  },
  selectBox: {
    padding: 12,
    borderRadius: 8,
  },
  selectText: { fontSize: 14 },
  modal: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  option: { padding: 12 },
  optionText: { fontSize: 18 }
});
