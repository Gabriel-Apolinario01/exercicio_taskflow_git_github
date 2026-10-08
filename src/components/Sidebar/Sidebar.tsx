import { CalendarDays, CircleCheckBig, Inbox, Layers, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const itensMenu = [
  { titulo: 'Hoje', caminho: '/', icone: Sun },
  { titulo: 'Próximas', caminho: '/proximas', icone: CalendarDays },
  { titulo: 'Todas as tarefas', caminho: '/tarefas', icone: Inbox },
  { titulo: 'Concluídas', caminho: '/concluidas', icone: CircleCheckBig },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo"><Layers size={23} aria-hidden="true" /></span>
        <div><strong>TaskFlow</strong><span>Organize. Priorize. Faça.</span></div>
      </div>
      <p className="sidebar__label">MEU ESPAÇO</p>
      <nav className="sidebar__nav" aria-label="Navegação principal">
        {itensMenu.map(({ titulo, caminho, icone: Icone }) => (
          <NavLink key={caminho} to={caminho} end className={({ isActive }) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}>
            <Icone size={19} aria-hidden="true" /><span>{titulo}</span>
          </NavLink>
        ))}
      </nav>
      <p className="sidebar__footer">Gerenciador de tarefas</p>
    </aside>
  );
}
