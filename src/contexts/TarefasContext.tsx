import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ConfiguracaoApiError, criarTarefa, excluirTarefa, listarTarefas } from '../services/tarefaService';
import type { NovaTarefa, Tarefa } from '../types/Tarefa';

type TarefasContextType = {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string;
  adicionarTarefa: (novaTarefa: NovaTarefa) => Promise<void>;
  removerTarefa: (id: string) => Promise<void>;
};

const TarefasContext = createContext<TarefasContextType | null>(null);

export function TarefasProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let ativo = true;

    async function carregarTarefas() {
      try {
        const dados = await listarTarefas(controller.signal);
        if (ativo) {
          // Um POST pode terminar antes do GET inicial: preserve a tarefa recém-criada.
          setTarefas((atuais) => [
            ...atuais,
            ...dados.filter((dado) => !atuais.some((tarefa) => tarefa._id === dado._id)),
          ]);
        }
      } catch (causa) {
        if (ativo) {
          setErro(causa instanceof ConfiguracaoApiError
            ? causa.message
            : 'Não foi possível carregar as tarefas. Confira a conexão e o endpoint do CrudCrud.');
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarTarefas();
    return () => {
      ativo = false;
      controller.abort();
    };
  }, []);

  async function adicionarTarefa(novaTarefa: NovaTarefa): Promise<void> {
    try {
      setErro('');
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((atuais) => [tarefaCriada, ...atuais]);
    } catch (causa) {
      const mensagem = causa instanceof ConfiguracaoApiError
        ? causa.message : 'Não foi possível criar a tarefa. Confira a conexão e se o endpoint do CrudCrud ainda está válido; ele é temporário. Se expirou, atualize VITE_API_URL no .env e reinicie o servidor.';
      setErro(mensagem);
      // O TaskForm trata a rejeição; o TaskModal só fecha após o sucesso.
      throw new Error(mensagem, { cause: causa });
    }
  }

  async function removerTarefa(id: string): Promise<void> {
    try {
      setErro('');
      await excluirTarefa(id);
      setTarefas((atuais) => atuais.filter((tarefa) => tarefa._id !== id));
    } catch (causa) {
      // Como na aula, o erro fica disponível ao consumidor sem remover o registro.
      setErro(causa instanceof ConfiguracaoApiError
        ? causa.message : 'Não foi possível excluir a tarefa. Confira a conexão e se o endpoint do CrudCrud ainda está válido; ele é temporário. Se expirou, atualize VITE_API_URL no .env e reinicie o servidor.');
    }
  }

  return (
    <TarefasContext.Provider value={{ tarefas, carregando, erro, adicionarTarefa, removerTarefa }}>
      {children}
    </TarefasContext.Provider>
  );
}

export function useTarefas() {
  const contexto = useContext(TarefasContext);
  if (!contexto) throw new Error('useTarefas deve ser utilizado dentro de TarefasProvider.');
  return contexto;
}
