import { useTarefas } from '../../contexts/TarefasContext';
import { TaskPage } from '../TaskPage';

export function Completed() {
  const { tarefas, carregando, erro, removerTarefa } = useTarefas();

  return (
    <TaskPage
      titulo="Concluídas" chamada="CAMINHO PERCORRIDO" descricao="Cada tarefa finalizada é um passo adiante."
      tarefas={tarefas.filter((tarefa) => tarefa.concluida)}
      carregando={carregando} erro={erro} aoExcluir={removerTarefa}
    />
  );
}
