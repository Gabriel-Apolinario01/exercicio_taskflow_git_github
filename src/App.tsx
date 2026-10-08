import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Today } from './pages/Today/Today';
import { Upcoming } from './pages/Upcoming/Upcoming';
import { Tasks } from './pages/Tasks/Tasks';
import { Completed } from './pages/Completed/Completed';
import { TarefasProvider } from './contexts/TarefasContext';

export default function App() {
  return (
    <BrowserRouter>
      <TarefasProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Today />} />
            <Route path="proximas" element={<Upcoming />} />
            <Route path="tarefas" element={<Tasks />} />
            <Route path="concluidas" element={<Completed />} />
            <Route path="*" element={<section><h1>Página não encontrada</h1><Link to="/">Voltar para Hoje</Link></section>} />
          </Route>
        </Routes>
      </TarefasProvider>
    </BrowserRouter>
  );
}
