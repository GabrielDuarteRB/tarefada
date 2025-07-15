import { api } from '../configurations/api-tarefada';
import { UserLoginInterface } from '../types/User/UserLoginInterface';

export const userService = {
  async listarTodos() {
    const response = await api.get('/usuario');
    return response.data;
  },

  async buscarPorId(id: number) {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  },

  async criar(dados: any) {
    const response = await api.post('/usuario', dados);
    return response.data;
  },

  async login(body: UserLoginInterface) {
    const response = await api.post('/usuario/login', body);
    return response.data;
  },

  async me() {
    const response = await api.get('/usuario/me');
    return response.data;
  }
};
