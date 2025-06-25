import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/CustomDrawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function DrawerLayout() {
  return (
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
