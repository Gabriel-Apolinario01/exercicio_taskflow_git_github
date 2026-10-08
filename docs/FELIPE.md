# Felipe: formulário e modal de criação

Sua branch é `codex/felipe`. Sua parte fica concentrada em TaskForm e TaskModal. Gabriel já implementou `adicionarTarefa` e Leonardo ficará responsável por abrir seu modal na interface.

## Começar

Você precisa ter acesso de colaborador ao repositório e usar sua própria conta GitHub. Caso falte acesso, envie seu usuário GitHub ao Gabriel para receber o convite.

```bash
git clone https://github.com/Gabriel-Apolinario01/exercicio_taskflow_git_github.git
cd exercicio_taskflow_git_github
git switch main
git pull --ff-only origin main
git switch -c codex/felipe
npm ci
```

Se já clonou, pule o clone. Se a branch já existe, use `git switch codex/felipe`. Confira `git config user.name` e `git config user.email`; eles devem identificar você. O README explica o `.env` e `npm run dev`.

## Seus arquivos

```text
src/components/TaskForm/TaskForm.tsx
src/components/TaskForm/TaskForm.css
src/components/TaskForm/TaskForm.test.tsx
src/components/TaskModal/TaskModal.tsx
src/components/TaskModal/TaskModal.css
src/components/TaskModal/TaskModal.test.tsx
```

Os testes são úteis aqui para garantir que um POST com falha não feche o modal nem apague o formulário. Vitest, Testing Library e user-event já estão instalados.

## TaskForm

Exporte `TaskForm` como função nomeada. Receba `aoSalvar: (tarefa: NovaTarefa) => Promise<void>` e `aoCancelar: () => void`. Importe `NovaTarefa` e `Prioridade` do arquivo comum de tipos, sem recriar uma interface diferente.

Implemente um formulário controlado com `useState`, contendo:

| Campo | Regra |
| --- | --- |
| Título | Obrigatório, máximo de 100 caracteres; rejeitar somente espaços. |
| Descrição | Textarea, máximo de 400 caracteres. |
| Prazo | `input type="date"`, pode ficar vazio. |
| Prioridade | Select: Alta/`high`, Média/`medium`, Baixa/`low`; inicial `medium`. |
| Projeto | Input de texto, pode ficar vazio. |
| Concluída | Enviar `false` na criação; não precisa de campo visual. |

Use `label` associado a cada campo, `preventDefault()` na submissão e atualização imutável do estado. “Cancelar” tem `type="button"`; “Criar tarefa” tem `type="submit"`.

Na submissão, valide o título, ative `salvando` e aguarde `aoSalvar`. Durante o envio, bloqueie submissões repetidas e mostre “Salvando...”. Em `catch`, apresente a mensagem em uma região de erro e mantenha os valores. Em `finally`, libere o envio. Só limpe os campos depois do sucesso. A rejeição de `aoSalvar` precisa ser tratada para não gerar uma Promise sem tratamento.

TaskForm não importa Axios, tarefaService ou TarefasContext. Ele coleta dados e chama a função recebida.

## TaskModal

Exporte `TaskModal` como função nomeada. Props: `aberto: boolean` e `aoFechar: () => void`.

1. Use `useTarefas()` para obter `adicionarTarefa`.
2. Quando `aberto` for falso, retorne `null`; nenhum overlay invisível deve permanecer.
3. Reutilize TaskForm. Sua função `salvarTarefa` deve executar `await adicionarTarefa(novaTarefa)` e somente depois chamar `aoFechar()`.
4. Se a criação falhar, deixe a rejeição chegar ao `catch` do formulário; não feche a janela.
5. Faça o botão X e “Cancelar” chamarem o fechamento. Enquanto uma criação estiver em andamento, impeça fechamento que descarte o formulário antes da resposta; o modal pode controlar localmente esse estado de envio.
6. Use overlay com `position: fixed`, `inset: 0`, `z-index` e fundo semitransparente. O painel deve ter largura máxima de 640px, altura limitada à viewport e rolagem interna. A interface de trás não pode receber cliques.
7. Identifique a janela com `role="dialog"`, `aria-modal="true"` e nome acessível. Direcione o foco para o modal, mantenha Tab/Shift+Tab dentro dele e devolva o foco ao botão de origem ao fechar. Escape pode cancelar quando não estiver salvando. Bloqueie a rolagem de fundo enquanto aberto e restaure-a na limpeza do efeito.
8. Hooks ficam antes dos retornos condicionais. Efeitos devem limpar listeners e restaurar alterações quando a janela fechar ou o componente desmontar.

Os itens de teclado completam a instrução da aula de manter a interação dentro da janela. Não aplique `pointer-events: none` no formulário; seus campos precisam continuar interativos.

Não crie outro provider e não altere App, Layout, Header ou Sidebar para a entrega da sua parte: Leonardo fará essa ligação. Para desenvolver antes dela, use testes renderizando TaskModal dentro de TarefasProvider com o serviço simulado; se usar uma tela temporária local, não a inclua no commit. Para uma conferência visual com API real, a ligação final será feita na integração.

## Commits por etapas reais

Exemplos de mensagens, depois de concluir cada etapa:

```text
implementa TaskForm controlado com validacao e envio assincrono
implementa TaskModal com criacao pelo contexto
adiciona controle de foco e bloqueio da interface no modal
verifica falha de cadastro sem fechar ou limpar formulario
```

Exemplo de publicação do formulário:

```bash
git status
git diff
git add src/components/TaskForm
git commit -m "implementa TaskForm controlado com validacao e envio assincrono"
git push -u origin codex/felipe
```

Depois publique também os commits do modal e dos testes. Não agrupe etapas inventadas apenas para aumentar a quantidade de commits.

## Conferência antes de avisar ao Gabriel

- `npm run check` passa.
- Título vazio ou somente espaços não envia requisição.
- Envio inclui os seis campos e nunca gera `_id` no cliente.
- Clique repetido enquanto salva não gera cadastros duplicados.
- Sucesso fecha o modal e o contexto atualiza a coleção.
- Falha mantém janela e campos, exibe erro e permite tentar novamente.
- X, Cancelar e Escape funcionam fora do envio; janela fechada não intercepta cliques.
- Fundo fica bloqueado; campos continuam interativos; foco fica no modal e retorna ao gatilho.
- Painel cabe em uma tela de celular e pode rolar internamente.

Envie ao Gabriel o nome `codex/felipe` e o que testou. Gabriel fará o merge antes de Leonardo concluir a ligação visual.

Base do professor: aula 06, seção 7.1 (formulário); continuação, seções 5 e 6 (TaskModal e overlay); slides de CSS e formulários acessíveis.
