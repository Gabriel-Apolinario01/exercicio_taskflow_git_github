import { useRef, useState } from 'react';
import { CalendarDays, Circle, CircleCheckBig, Folder, LoaderCircle, Trash2 } from 'lucide-react';
import type { Prioridade, Tarefa } from '../../types/Tarefa';
import './TaskCard.css';

type TaskCardProps = { tarefa: Tarefa; aoExcluir: (id: string) => Promise<void> };

const prioridades: Record<Prioridade, string> = { high: 'Alta', medium: 'Média', low: 'Baixa' };

export function TaskCard({ tarefa, aoExcluir }: Readonly<TaskCardProps>) {
  const [excluindo, setExcluindo] = useState(false);
  const exclusaoEmAndamento = useRef(false);
  const Status = tarefa.concluida ? CircleCheckBig : Circle;

  async function excluir() {
    if (!tarefa._id || exclusaoEmAndamento.current) return;
    exclusaoEmAndamento.current = true;
    setExcluindo(true);
    try {
      // O contexto mantém o registro e informa o erro se a API falhar.
      await aoExcluir(tarefa._id);
    } finally {
      exclusaoEmAndamento.current = false;
      setExcluindo(false);
    }
  }

  return (
    <article className={`task-card${tarefa.concluida ? ' task-card--completed' : ''}`} aria-busy={excluindo}>
      <div className="task-card__top">
        <span className={`task-card__priority task-card__priority--${tarefa.prioridade}`}>
          <span aria-hidden="true" />Prioridade {prioridades[tarefa.prioridade]}
        </span>
        <span className="task-card__status"><Status size={16} aria-hidden="true" />{tarefa.concluida ? 'Concluída' : 'Pendente'}</span>
      </div>
      <h2 className="task-card__title">{tarefa.titulo}</h2>
      <p className="task-card__description">{tarefa.descricao || 'Sem descrição.'}</p>
      <dl className="task-card__details">
        <div>
          <dt><CalendarDays size={15} aria-hidden="true" />Prazo</dt>
          <dd>{tarefa.data ? <time dateTime={tarefa.data}>{tarefa.data.split('-').reverse().join('/')}</time> : 'Sem prazo'}</dd>
        </div>
        <div>
          <dt><Folder size={15} aria-hidden="true" />Projeto</dt>
          <dd>{tarefa.projeto || 'Sem projeto'}</dd>
        </div>
      </dl>
      <div className="task-card__footer">
        <button
          className="task-card__delete" type="button" onClick={() => void excluir()}
          disabled={excluindo || !tarefa._id} aria-label={`Excluir tarefa: ${tarefa.titulo}`}
          title={!tarefa._id ? 'A tarefa ainda não tem um identificador para exclusão.' : undefined}
        >
          {excluindo ? <LoaderCircle className="task-card__spinner" size={16} aria-hidden="true" /> : <Trash2 size={16} aria-hidden="true" />}
          {excluindo ? 'Excluindo...' : 'Excluir'}
        </button>
      </div>
    </article>
  );
}
