import type { ReactNode } from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { TaskList } from '../components/TaskList/TaskList';
import type { Tarefa } from '../types/Tarefa';
import './Tasks/Tasks.css';

type TaskPageProps = {
  titulo: string;
  chamada: string;
  descricao: string;
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string;
  aoExcluir: (id: string) => Promise<void>;
  acao?: ReactNode;
};

export function TaskPage({ titulo, chamada, descricao, tarefas, carregando, erro, aoExcluir, acao }: Readonly<TaskPageProps>) {
  return (
    <section className="tasks-page" aria-labelledby="titulo-pagina">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">{chamada}</p>
          <h1 id="titulo-pagina">{titulo}</h1>
          <p className="tasks-page__description">{descricao}</p>
        </div>
        {acao}
      </div>
      {erro && <p className="tasks-page__error" role="alert"><AlertCircle size={20} aria-hidden="true" />{erro}</p>}
      {carregando && <p className="tasks-page__loading" role="status"><LoaderCircle size={20} aria-hidden="true" />Carregando tarefas...</p>}
      {tarefas.length > 0 ? (
        <>
          <p className="tasks-page__count">{tarefas.length} {tarefas.length === 1 ? 'tarefa nesta página' : 'tarefas nesta página'}</p>
          <TaskList tarefas={tarefas} aoExcluir={aoExcluir} />
        </>
      ) : !carregando && !erro && <TaskList tarefas={tarefas} aoExcluir={aoExcluir} />}
    </section>
  );
}
