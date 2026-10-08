export type Prioridade = 'high' | 'medium' | 'low';

// Estrutura utilizada nas aulas. O CrudCrud gera _id após o cadastro.
export type Tarefa = {
  _id?: string;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: Prioridade;
  projeto: string;
  concluida: boolean;
};

export type NovaTarefa = Omit<Tarefa, '_id'>;
