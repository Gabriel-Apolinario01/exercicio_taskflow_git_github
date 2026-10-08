import { useTarefas } from '../../contexts/TarefasContext';
import './Tasks.css';

export function Tasks() {
  const { tarefas, carregando, erro } = useTarefas();

  return (
    <section className="tasks-page">
      <p className="page-eyebrow">VISÃO GERAL</p>
      <h1>Todas as tarefas</h1>
      <p>Visualização completa das tarefas cadastradas.</p>
      {erro && <p className="tasks-page__error" role="alert">{erro}</p>}
      {carregando ? (
        <p role="status">Carregando tarefas...</p>
      ) : !erro && (
        <div className="tasks-page__summary">
          <h2>{tarefas.length === 0 ? 'Nenhuma tarefa cadastrada' : `${tarefas.length} tarefa(s) cadastrada(s)`}</h2>
          {tarefas.length > 0 && <ul>{tarefas.map((tarefa) => <li key={tarefa._id}>{tarefa.titulo}</li>)}</ul>}
        </div>
      )}
    </section>
  );
}
