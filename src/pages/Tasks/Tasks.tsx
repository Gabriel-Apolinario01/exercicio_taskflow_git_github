import { useOutletContext } from 'react-router-dom';
import type { LayoutContext } from '../../components/Layout/Layout';
import { useTarefas } from '../../contexts/TarefasContext';
import { TaskPage } from '../TaskPage';

export function Tasks() {
  const { tarefas, carregando, erro, removerTarefa } = useTarefas();
  const { abrirTaskModal } = useOutletContext<LayoutContext>();

  return (
    <TaskPage
      titulo="Todas as tarefas" chamada="VISÃO GERAL" descricao="Visualização completa das tarefas cadastradas."
      tarefas={tarefas} carregando={carregando} erro={erro} aoExcluir={removerTarefa}
      acao={<button type="button" onClick={abrirTaskModal}>Nova tarefa</button>}
    />
  );
}
