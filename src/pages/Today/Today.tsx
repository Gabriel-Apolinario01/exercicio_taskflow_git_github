import { useTarefas } from '../../contexts/TarefasContext';
import { dataLocal } from '../dataLocal';
import { TaskPage } from '../TaskPage';

export function Today() {
  const { tarefas, carregando, erro, removerTarefa } = useTarefas();
  const hoje = dataLocal();

  return (
    <TaskPage
      titulo="Hoje" chamada="FOCO DO DIA" descricao="Concentre-se no que precisa avançar agora."
      tarefas={tarefas.filter((tarefa) => !tarefa.concluida && tarefa.data === hoje)}
      carregando={carregando} erro={erro} aoExcluir={removerTarefa}
    />
  );
}
