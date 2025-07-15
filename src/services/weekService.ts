import { api } from '../configurations/api-tarefada';

export const weekService = {
  async findCurrentWeek() {
    const response = await api.get('/semana/atual');
    return response.data;
  },

  async deleteCurrentWeek() {
    const response = await api.delete('/semana/atual');
    return response.data;
  },

  async participatedWeek(id: number) {
    const response = await api.post(`/semana/${id}/participar`);
    return response.data;
  },

  async createWeek(dados: any) {
    const response = await api.post('/semana', dados);
    return response.data;
  },

  async ranking() {
    const response = await api.get('/semana/ranking');
    return response.data;
  }

};
