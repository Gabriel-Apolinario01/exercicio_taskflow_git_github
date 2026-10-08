import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import './Layout.css';

// Contrato da continuação da aula: Leonardo implementará o estado do modal aqui.
export type LayoutContext = { abrirTaskModal: () => void };

export function Layout() {
  return (
    <div className="app-layout">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Sidebar />
      <div className="app-layout__content">
        <Header />
        <main className="app-layout__main" id="conteudo" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
