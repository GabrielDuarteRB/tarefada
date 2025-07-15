import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Pressable
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TaskInterface } from '../../types/TaskInterface';


type Props = {
  tasks: TaskInterface[];
};

export default function TasksCarrossel({ tasks } : Props) {
  const [indexAtual, setIndexAtual] = useState(0);
  const animTranslate = useRef(new Animated.Value(0)).current;

  const getIndex = (i: number) => {
    const total = tasks.length;
    return (i + total) % total;
  };

  const animar = (direcao: 'left' | 'right') => {
    const dir = direcao === 'left' ? 1 : -1;

    Animated.timing(animTranslate, {
      toValue: dir * -150,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      animTranslate.setValue(0);
      setIndexAtual((prev) => getIndex(prev + dir));
    });
  };

  const leftIndex = getIndex(indexAtual - 1);
  const centerIndex = getIndex(indexAtual);
  const rightIndex = getIndex(indexAtual + 1);

  if (tasks.length < 3) {
    return (
      <View style={styles.container}>
        {tasks.map((task) => (
          <Link href={`/task/${task.id_tarefa}`} asChild key={task.id_tarefa}>
            <Pressable>
              <View style={[styles.cardWrapper, styles.cardWrapperCenter]}>
                <Image
                  source={require('@/assets/images/card.png')}
                  style={[styles.cardImageCenter]}
                />
                <Text style={[styles.cardTitle, styles.cardTitleCenter]}>
                  {task.titulo.length > 8
                    ? `${task.titulo.slice(0, 8)}...`
                    : task.titulo}
                </Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    );
  }


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => animar('right')}>
          <Ionicons name="chevron-back" size={32} />
        </TouchableOpacity>

        <View style={styles.carousel}>
          <Animated.View
            style={[
              styles.cardsWrapper,
              { transform: [{ translateX: animTranslate }] },
            ]}
          >
            {[leftIndex, centerIndex, rightIndex].map((idx, i) => {
              const isCenter = i === 1;
              return (
                <Link href={`/task/${tasks[idx].id_tarefa}`} asChild key={tasks[idx].id_tarefa}>
                  <Pressable>
                    <View
                      style={[
                        styles.cardWrapper,
                        isCenter && styles.cardWrapperCenter,
                      ]}
                    >
                      <Image
                        source={require('@/assets/images/card.png')}
                        style={[
                          styles.cardImage,
                          isCenter && styles.cardImageCenter,
                        ]}
                      />
                      <Text
                        style={[
                          styles.cardTitle,
                          isCenter && styles.cardTitleCenter,
                        ]}
                      >
                        {tasks[idx].titulo.length > 8
                          ? `${tasks[idx].titulo.slice(0, 8)}...`
                          : tasks[idx].titulo}
                      </Text>
                    </View>
                  </Pressable>

                </Link>
              );
            })}
          </Animated.View>
        </View>

        <TouchableOpacity onPress={() => animar('left')}>
          <Ionicons name="chevron-forward" size={32} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  carousel: {
    width: 280,
    height: 300,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsWrapper: {
    flexDirection: 'row',
    width: 260,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardWrapper: {
    alignItems: 'center',
    opacity: 0.6,
  },
  cardWrapperCenter: {
    opacity: 1,
  },
  cardImage: {
    width: 40,
    height: 60,
  },
  cardImageCenter: {
    width: 160,
    height: 250,
  },
  cardTitle: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  cardTitleCenter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
