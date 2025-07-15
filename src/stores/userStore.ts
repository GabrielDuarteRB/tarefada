import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { userService } from '../services/userService';
import { UserLoginInterface } from '../types/User/UserLoginInterface';

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
}

interface UseStore {
  user: Usuario,
  carregarUsuarios: () => Promise<void>;
  login: (body: UserLoginInterface) => Promise<void>;
  create: (body: any) => Promise<void>;
  me: () => Promise<void>;
}

export const useUserStore = create<UseStore>((set) => ({
  user: {},
  carregarUsuarios: async () => {
    const dados = await userService.listarTodos();
    set({ user: dados });
  },
  login: async (body: UserLoginInterface) => {
    const dados = await userService.login(body);
    await AsyncStorage.setItem('@token', dados.access_token);
    set({ user: dados });
  },
  create: async (body: any) => {
    await userService.create(body);
  },
  me: async () => {
    const dados = await userService.me();
    set({ user: dados });
  }
}));
