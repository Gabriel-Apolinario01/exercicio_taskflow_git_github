import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { TaskModal } from '../TaskModal/TaskModal';
import './Layout.css';

export type LayoutContext = { abrirTaskModal: () => void };

export function Layout() {
  const [taskModalAberto, setTaskModalAberto] = useState(false);
  function abrirTaskModal() { setTaskModalAberto(true); }
  function fecharTaskModal() { setTaskModalAberto(false); }

  return (
    <>
      <div className="app-layout">
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Sidebar aoNovaTarefa={abrirTaskModal} />
        <div className="app-layout__content">
          <Header aoNovaTarefa={abrirTaskModal} />
          <main className="app-layout__main" id="conteudo" tabIndex={-1}>
            <Outlet context={{ abrirTaskModal } satisfies LayoutContext} />
          </main>
        </div>
      </div>
      <TaskModal aberto={taskModalAberto} aoFechar={fecharTaskModal} />
    </>
  );
}
