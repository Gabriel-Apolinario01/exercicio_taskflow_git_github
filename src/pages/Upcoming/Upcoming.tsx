import { useTarefas } from '../../contexts/TarefasContext';
import { dataLocal } from '../dataLocal';
import { TaskPage } from '../TaskPage';

export function Upcoming() {
  const { tarefas, carregando, erro, removerTarefa } = useTarefas();
  const hoje = dataLocal();

  return (
    <TaskPage
      titulo="Próximas" chamada="OLHANDO ADIANTE" descricao="Um pouco de planejamento para os próximos dias."
      tarefas={tarefas.filter((tarefa) => !tarefa.concluida && tarefa.data > hoje)}
      carregando={carregando} erro={erro} aoExcluir={removerTarefa}
    />
  );
}
