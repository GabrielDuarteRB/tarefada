import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function CustomDrawer(props: any) {

  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingTop: 40 }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.usuario}>Olá, Gabriel Duarte</Text>

        <View style={styles.separacao}>
          <DrawerItem
            label="Perfil"
            icon={({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('profile')}
          />
          <DrawerItem
            label="Semana"
            icon={({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('index')}
          />
          <DrawerItem
            label="Ranking"
            icon={({ color, size }) => (
              <Ionicons name="trophy-outline" size={size} color={color} />
            )}
            onPress={() => props.navigation.navigate('ranking')}
          />

          <DrawerItem
            label="Para validar"
            icon={({ color, size }) => (
              <Ionicons
                name="checkmark-done-outline"
                size={size}
                color={color}
              />
            )}
            onPress={() => props.navigation.navigate('validateWeek')}
          />
        </View>

        <View>
          <DrawerItem
            label="Configurações"
            icon={({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            )}
            onPress={() => router.push("/configuration")}
          />

          <DrawerItem
            label="Sair"
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
            onPress={() => {
              alert('Você saiu do app');
            }}
          />

        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  usuario: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  separacao: {
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    paddingVertical: 24,
    marginBottom: 24,
  },
});
