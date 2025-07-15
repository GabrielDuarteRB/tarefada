export interface TaskInterface {
  id_tarefa: number;
  id_semana: number;
  titulo: string;
  data_inicio: string;
  ponto: number;
  id_usuario_atribuido: number;
  data_termino: string;
  status: string;
  comprovante?: string; // pode ser string base64 ou null
}