import { ClipboardList } from 'lucide-react';
import type { Tarefa } from '../../types/Tarefa';
import { TaskCard } from '../TaskCard/TaskCard';
import './TaskList.css';

type TaskListProps = { tarefas: Tarefa[]; aoExcluir: (id: string) => Promise<void> };

export function TaskList({ tarefas, aoExcluir }: Readonly<TaskListProps>) {
  if (tarefas.length === 0) {
    return (
      <div className="task-list__empty" role="status">
        <span className="task-list__empty-icon"><ClipboardList size={28} aria-hidden="true" /></span>
        <h2>Nenhuma tarefa por aqui</h2>
        <p>As tarefas desta página aparecerão aqui.<br />Use “Nova tarefa” para organizar seu próximo passo.</p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Lista de tarefas">
      {tarefas.map((tarefa) => <li key={tarefa._id}><TaskCard tarefa={tarefa} aoExcluir={aoExcluir} /></li>)}
    </ul>
  );
}
