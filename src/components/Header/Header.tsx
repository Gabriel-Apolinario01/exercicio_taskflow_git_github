import { CheckCheck, Plus } from 'lucide-react';
import './Header.css';

type HeaderProps = { aoNovaTarefa: () => void };

export function Header({ aoNovaTarefa }: Readonly<HeaderProps>) {
  return (
    <header className="header">
      <span className="header__intro"><CheckCheck size={19} aria-hidden="true" /><span>Seu espaço de organização</span></span>
      <button className="header__new" type="button" onClick={aoNovaTarefa}><Plus size={18} aria-hidden="true" />Nova tarefa</button>
    </header>
  );
}
