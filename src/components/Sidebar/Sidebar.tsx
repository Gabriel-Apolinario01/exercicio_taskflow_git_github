import { CalendarDays, CircleCheckBig, Inbox, Plus, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const itensMenu = [
  { titulo: 'Hoje', caminho: '/', icone: Sun },
  { titulo: 'Próximas', caminho: '/proximas', icone: CalendarDays },
  { titulo: 'Todas as tarefas', caminho: '/tarefas', icone: Inbox },
  { titulo: 'Concluídas', caminho: '/concluidas', icone: CircleCheckBig },
];

type SidebarProps = { aoNovaTarefa: () => void };

export function Sidebar({ aoNovaTarefa }: Readonly<SidebarProps>) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src="https://kiro.dev/images/community/events/thumbnails/meetup2.svg" alt="TaskFlow" className="sidebar__logo" />
        <div><strong>TaskFlow</strong><span>Gerenciador de tarefas</span></div>
      </div>
      <button className="sidebar__new-task" type="button" onClick={aoNovaTarefa}><Plus size={18} aria-hidden="true" />Nova tarefa</button>
      <nav className="sidebar__nav" aria-label="Navegação principal">
        {itensMenu.map(({ titulo, caminho, icone: Icone }) => (
          <NavLink key={caminho} to={caminho} end className={({ isActive }) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}>
            <Icone size={19} aria-hidden="true" /><span>{titulo}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
