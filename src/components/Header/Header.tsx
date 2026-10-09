import { Plus, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import './Header.css';

type HeaderProps = { aoNovaTarefa: () => void };

export function Header({ aoNovaTarefa }: Readonly<HeaderProps>) {
  const [parametros, setParametros] = useSearchParams();

  function buscar(valor: string) {
    setParametros((atuais) => {
      const novos = new URLSearchParams(atuais);
      if (valor) novos.set('q', valor);
      else novos.delete('q');
      return novos;
    }, { replace: true });
  }

  return (
    <header className="header">
      <div className="header__search">
        <Search size={18} aria-hidden="true" />
        <input type="search" placeholder="Buscar tarefas..." aria-label="Buscar tarefas"
          value={parametros.get('q') ?? ''} onChange={(evento) => buscar(evento.target.value)} />
      </div>
      <button className="header__new-task" type="button" onClick={aoNovaTarefa}><Plus size={18} aria-hidden="true" />Nova tarefa</button>
    </header>
  );
}
