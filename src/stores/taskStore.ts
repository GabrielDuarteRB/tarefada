import { create } from 'zustand';
import { taskService } from '../services/TaskService';


interface UseStore {
  tasks: [];
  task: {};
  findTasks: (params: any) => Promise<void>;
  createTaks: (body: any) => Promise<void>;
  findOneTask: (id: any) => Promise<void>;
  updateTask: (id: any, body: any) => Promise<void>;
  normalUpdateTask: (id: any, body: any) => Promise<void>;
  deleteTask: (id: any) => Promise<void>;
  resetTasks: () => void;
}

export const useTaskStore = create<UseStore>((set) => ({
  tasks: [],
  task: {},
  findTasks: async (params: any) => {
    const dados = await taskService.findTasks(params);
    set({ tasks: dados });
  },
  createTaks: async (body: any) => {
    await taskService.createTaks(body);
  },
  findOneTask: async (id) => {
    const response = await taskService.findOneTask(id);
    set({ task: response });
  },
  updateTask: async (id, body) => {
   await taskService.updateTask(id, body);
  },
  normalUpdateTask: async (id, body) => {
    await taskService.normalUpdateTask(id, body);
   },
  deleteTask: async (id) => {
    await taskService.delete(id);
   },
  // Adicionado para limpar o array de tarefas
  resetTasks: () => set({ tasks: [] }),
}));
