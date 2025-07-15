import { useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardTask from '../Cards/Task';
import { TaskInterface } from '../../types/TaskInterface';

const ITEM_HEIGHT = 80;

type Props = {
  tasks: TaskInterface[];
  renderCard: (task: TaskInterface) => React.ReactNode;
};

export default function TasksListCarrossel({ tasks, renderCard } : Props) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollToIndex = (index: number) => {
    Animated.timing(scrollY, {
      toValue: index * ITEM_HEIGHT,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleUp = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleDown = () => {
    if (currentIndex < tasks.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  return (
    <View>
        <TouchableOpacity style={styles.arrows} onPress={handleUp} disabled={currentIndex === 0}>
          <Ionicons name="chevron-up-outline" size={36} />
        </TouchableOpacity>

        <View style={{ height: ITEM_HEIGHT * 3, overflow: 'hidden' }}>

          <Animated.View
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, tasks.length * ITEM_HEIGHT],
                    outputRange: [0, -tasks.length * ITEM_HEIGHT],
                  }),
                },
              ],
            }}
          >
            {tasks.map((task) => (
              <View key={task.id_tarefa} style={{ height: ITEM_HEIGHT }}>
                {renderCard(task)}
              </View>
            ))}
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.arrows} onPress={handleDown} disabled={currentIndex === tasks.length - 1}>
          <Ionicons name="chevron-down-outline" size={36} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  },
  arrows: {
    alignItems: 'center',
    marginVertical: 16,
  }
});
