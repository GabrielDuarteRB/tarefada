import { api } from '../configurations/api-tarefada';

export const taskService = {

  async findTasks(params: any = {}) {
    const response = await api.get('/tarefa?' + new URLSearchParams(params));
    return response.data;
  },

  async createTaks(body: any) {
    const response = await api.post('/tarefa', body);
    return response.data;
  },

  async findOneTask(id: number) {
    const response = await api.get(`/tarefa/${id}`);
    return response.data;
  },

  async updateTask(id: number, body: any) {
    const response = await api.patch(`/tarefa/${id}`, body);
    return response.data;
  }
};
