'use client';

import { useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Slot, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native';
import CustomDrawer from '../components/CustomDrawer';
import { useUserStore } from '../stores/userStore'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DrawerLayout() {

  const navigation = useNavigation();
  const pathname = usePathname();
  const router = useRouter();

  const { me } = useUserStore();

  useFocusEffect(
    useCallback(() => {
      if (pathname === '/login' || pathname === '/create_user') return;

      let isActive = true;

      (async () => {
        try {
          const token = await AsyncStorage.getItem('@token');

          if (!token) {
            router.replace('/login');
            return;
          }

          await me();
        } catch {
          if (isActive) router.push('/login');
        }
      })();

      return () => { isActive = false; };
    }, [pathname])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#f8f8f8' },
          headerTitle: "",
          headerTintColor: '#333',
          headerLeft: () => <MenuButton />,
          headerRight: () => <BackButton />,
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="create_week" />
      </Drawer>
    </SafeAreaView>
  );
}

function MenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ paddingHorizontal: 16 }}
    >
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
}

function BackButton() {
  const navigation = useNavigation();

  if (!navigation.canGoBack?.()) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingHorizontal: 16 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}
