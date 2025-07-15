import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export default function Loader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const innerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(innerAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const innerRotate = innerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <Animated.View style={[styles.loader, { transform: [{ rotate }] }]}> 
      <Animated.View style={[styles.inner, { transform: [{ rotate: innerRotate }] }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loader: {
    width: 50,
    height: 50,
    backgroundColor: '#514b82',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
}); 