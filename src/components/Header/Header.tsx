import { CheckCheck } from 'lucide-react';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <span><CheckCheck size={19} aria-hidden="true" /> Seu espaço de organização</span>
      <span className="header__caption">Um passo de cada vez.</span>
    </header>
  );
}
