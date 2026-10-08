import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../App';
import { criarTarefa, excluirTarefa, listarTarefas } from '../../services/tarefaService';

vi.mock('../../services/tarefaService', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../services/tarefaService')>();
  return { ...original, listarTarefas: vi.fn(), criarTarefa: vi.fn(), excluirTarefa: vi.fn() };
});

beforeEach(() => {
  window.history.replaceState(null, '', '/tarefas');
  vi.mocked(listarTarefas).mockReset().mockResolvedValue([]);
  vi.mocked(criarTarefa).mockReset().mockImplementation(async (tarefa) => ({ ...tarefa, _id: 'nova' }));
  vi.mocked(excluirTarefa).mockReset().mockResolvedValue(undefined);
});

describe('Layout integrado', () => {
  it('abre um único modal por cada um dos três botões e devolve o foco ao gatilho', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    await screen.findByText('Nenhuma tarefa por aqui');
    const botoes = screen.getAllByRole('button', { name: 'Nova tarefa' });
    expect(botoes).toHaveLength(3);
    for (const botao of botoes) {
      await user.click(botao);
      expect(screen.getAllByRole('dialog', { name: 'Nova tarefa' })).toHaveLength(1);
      expect(container).toHaveAttribute('inert');
      expect(screen.getByLabelText(/Título/)).toHaveFocus();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(container).not.toHaveAttribute('inert');
      expect(botao).toHaveFocus();
    }
  });

  it('cria pelo modal compartilhado e atualiza o card sem recarregar a página', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Nenhuma tarefa por aqui');
    await user.click(within(screen.getByRole('main')).getByRole('button', { name: 'Nova tarefa' }));
    await user.type(screen.getByLabelText(/Título/), 'Entregar interface');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(await screen.findByRole('heading', { name: 'Entregar interface' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(criarTarefa).toHaveBeenCalledExactlyOnceWith({ titulo: 'Entregar interface', descricao: '', data: '', prioridade: 'medium', projeto: '', concluida: false });
    expect(listarTarefas).toHaveBeenCalledTimes(1);
  });

  it('preserva Header e Sidebar nas quatro rotas e destaca apenas o link ativo', async () => {
    const user = userEvent.setup();
    render(<App />);
    const header = screen.getByRole('banner');
    const sidebar = screen.getByRole('complementary');
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    for (const nome of ['Hoje', 'Próximas', 'Concluídas', 'Todas as tarefas']) {
      const link = within(nav).getByRole('link', { name: nome });
      await user.click(link);
      await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(nome));
      expect(link).toHaveAttribute('aria-current', 'page');
      expect(within(nav).getAllByRole('link').filter((item) => item.hasAttribute('aria-current'))).toHaveLength(1);
      expect(screen.getByRole('banner')).toBe(header);
      expect(screen.getByRole('complementary')).toBe(sidebar);
    }
    expect(listarTarefas).toHaveBeenCalledTimes(1);
  });
});
