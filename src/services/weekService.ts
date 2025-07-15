import { api } from '../configurations/api-tarefada';

export const weekService = {
  async findCurrentWeek() {
    const response = await api.get('/semana/atual');
    return response.data;
  },

  async createWeek(dados: any) {
    const response = await api.post('/semana', dados);
    return response.data;
  },
};
