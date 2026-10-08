import { Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { LayoutContext } from '../../components/Layout/Layout';
import { useTarefas } from '../../contexts/TarefasContext';
import { TaskPage } from '../TaskPage';

export function Tasks() {
  const { tarefas, carregando, erro, removerTarefa } = useTarefas();
  const { abrirTaskModal } = useOutletContext<LayoutContext>();

  return (
    <TaskPage
      titulo="Todas as tarefas" chamada="VISÃO GERAL" descricao="Seus próximos passos, todos em um só lugar."
      tarefas={tarefas} carregando={carregando} erro={erro} aoExcluir={removerTarefa}
      acao={<button className="tasks-page__new" type="button" onClick={abrirTaskModal}><Plus size={18} aria-hidden="true" />Nova tarefa</button>}
    />
  );
}
