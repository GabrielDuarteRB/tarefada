import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { weekService } from '../services/weekService';
import { UserLoginInterface } from '../types/User/UserLoginInterface';


interface UseStore {
  week: {};
  currentWeek: () => Promise<void>;
  createWeek: (body: any) => Promise<void>;
}

export const useWeekStore = create<UseStore>((set) => ({
  week: {},
  currentWeek: async () => {
    const dados = await weekService.findCurrentWeek();
    set({ week: dados });
  },
  createWeek: async (body: any) => {
    const dados = await weekService.createWeek(body);
    set({ week: dados });
  }
}));
