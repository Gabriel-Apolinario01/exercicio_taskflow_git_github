import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('envia os campos da aula sem _id e limpa os valores após sucesso', async () => {
    const salvar = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), '  Revisar atividade  ');
    await user.type(screen.getByLabelText(/Descrição/), 'Conferir requisitos');
    fireEvent.change(screen.getByLabelText(/Prazo/), { target: { value: '2026-11-09' } });
    await user.selectOptions(screen.getByLabelText('Prioridade'), 'high');
    await user.type(screen.getByLabelText(/Projeto/), '  TaskFlow  ');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(salvar).toHaveBeenCalledExactlyOnceWith({
      titulo: 'Revisar atividade', descricao: 'Conferir requisitos', data: '2026-11-09',
      prioridade: 'high', projeto: 'TaskFlow', concluida: false,
    });
    expect(screen.getByLabelText(/Título/)).toHaveValue('');
    expect(screen.getByLabelText('Prioridade')).toHaveValue('medium');
  });

  it('permite campos opcionais vazios e usa prioridade média inicialmente', async () => {
    const salvar = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), 'Estudar React');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(salvar).toHaveBeenCalledWith({
      titulo: 'Estudar React', descricao: '', data: '', prioridade: 'medium', projeto: '', concluida: false,
    });
  });

  it('não envia título vazio pela validação nativa', async () => {
    const salvar = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(salvar).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/Título/)).toBeInvalid();
  });

  it('rejeita título composto apenas de espaços e mantém o foco no campo', async () => {
    const salvar = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), '   ');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(salvar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um título');
    expect(screen.getByLabelText(/Título/)).toHaveFocus();
  });

  it('respeita os limites de título e descrição', async () => {
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={vi.fn()} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), 'a'.repeat(105));
    await user.type(screen.getByLabelText(/Descrição/), 'b'.repeat(405));
    expect(screen.getByLabelText(/Título/)).toHaveValue('a'.repeat(100));
    expect(screen.getByLabelText(/Descrição/)).toHaveValue('b'.repeat(400));
    expect(screen.getByText('400/400 caracteres')).toBeInTheDocument();
  });

  it('bloqueia envio duplicado e cancelamento até a resposta', async () => {
    let concluir!: () => void;
    const salvar = vi.fn(() => new Promise<void>((resolve) => { concluir = resolve; }));
    const cancelar = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<TaskForm aoSalvar={salvar} aoCancelar={cancelar} />);
    await user.type(screen.getByLabelText(/Título/), 'Enviar uma vez');
    const form = container.querySelector('form')!;
    act(() => { fireEvent.submit(form); fireEvent.submit(form); });
    expect(salvar).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Salvando...' })).toBeDisabled();
    expect(screen.getByLabelText(/Título/)).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(cancelar).not.toHaveBeenCalled();
    await act(async () => { concluir(); });
    expect(screen.getByRole('button', { name: 'Criar tarefa' })).toBeEnabled();
  });

  it('mantém os campos quando salvar falha e permite tentar novamente', async () => {
    const salvar = vi.fn().mockRejectedValueOnce(new Error('Não foi possível criar a tarefa.')).mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), 'Preservar preenchimento');
    await user.type(screen.getByLabelText(/Descrição/), 'Observação importante');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível criar');
    expect(screen.getByLabelText(/Título/)).toHaveValue('Preservar preenchimento');
    expect(screen.getByLabelText(/Descrição/)).toHaveValue('Observação importante');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    await waitFor(() => expect(salvar).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('apresenta mensagem útil para rejeições sem objeto Error', async () => {
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={vi.fn().mockRejectedValue(undefined)} aoCancelar={vi.fn()} />);
    await user.type(screen.getByLabelText(/Título/), 'Tentar salvar');
    await user.click(screen.getByRole('button', { name: 'Criar tarefa' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Tente novamente');
  });

  it('cancela sem submeter o formulário', async () => {
    const cancelar = vi.fn();
    const salvar = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm aoSalvar={salvar} aoCancelar={cancelar} />);
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(cancelar).toHaveBeenCalledOnce();
    expect(salvar).not.toHaveBeenCalled();
  });
});
