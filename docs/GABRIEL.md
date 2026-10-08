# Gabriel: dados e integração

Branch de desenvolvimento: `codex/gabriel`.

## Parte implementada

- Base React + TypeScript + Vite, dependências, configuração de lint/testes/build e lockfile para instalação reproduzível.
- Estrutura inicial de Layout, Header, Sidebar e quatro páginas, reconstruída porque o repositório só tinha um README.
- `Tarefa`, `Prioridade` e `NovaTarefa`, com os campos usados pelo professor.
- `tarefaService`: Axios, configuração `VITE_API_URL`, GET `/tarefas`, POST `/tarefas` sem `_id`, DELETE `/tarefas/:id`, timeout e validação das respostas.
- `TarefasProvider` e `useTarefas`: uma coleção compartilhada, carregamento inicial, erros, criação e exclusão com atualização após a resposta da API.
- Provider acima das rotas em App. Página Tasks já consome os dados em um resumo inicial que Leonardo substituirá por TaskList.
- Testes de sucesso, falhas, preservação do estado, sincronização entre consumidores e limpeza do efeito.
- Documentação do trabalho dos três integrantes.

O formato e a separação de responsabilidades seguem os PDFs. A validação de configuração/resposta, cancelamento do GET, proteção contra resposta antiga e testes complementam os exemplos. Nenhum endpoint real ou dado pessoal foi adicionado ao repositório.

## Como explicar sua implementação

1. App envolve as rotas em TarefasProvider. Assim, páginas e modal acessam o mesmo estado.
2. O `useEffect` do provider chama `listarTarefas` ao montar. O serviço faz a requisição HTTP; o contexto guarda o retorno. A limpeza cancela a requisição e impede que respostas de um efeito antigo alterem a tela.
3. Ao criar, TaskForm envia os campos para TaskModal; o modal chama `adicionarTarefa`. O contexto aguarda o POST, recebe o `_id` do CrudCrud e acrescenta a tarefa à lista. Se falhar, lança um erro que o formulário deve tratar; o modal não chega ao fechamento.
4. Ao excluir, a ação percorre TaskCard, TaskList e a página até `removerTarefa`. Primeiro ocorre DELETE no backend; depois `filter` atualiza o estado. Se falhar, a tarefa continua visível e `erro` informa o problema.
5. Layout não consulta a API e não guarda a coleção. Ele será responsável pela estrutura e pela apresentação de um único modal.

`filter` altera a coleção em memória; não apaga registros no backend. `useTarefas` acessa o contexto existente; não cria um estado separado por componente. `_id` é responsabilidade do CrudCrud.

## Integração das contribuições

Gabriel é o integrador. As próximas etapas dependem de Leonardo e Felipe publicarem seus próprios commits. Não faça a entrega final enquanto faltarem essas partes.

Antes dos merges, confirme que ambos aceitaram convite de colaborador, usaram a própria identidade Git e enviaram branches com alterações reais. Não é necessário publicar o e-mail deles no README.

Para cada contribuição, revise os arquivos e rode os testes na branch do colega antes do merge. Exemplo para Felipe, com sua árvore de trabalho limpa:

```bash
git status
git fetch origin
git switch --detach origin/codex/felipe
npm ci
npm run check
```

O estado detached serve apenas para revisão, sem commits. Se encontrar problema, peça ao colega a correção na branch dele. Depois de aprovado:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff origin/codex/felipe -m "integra formulario e modal desenvolvidos por Felipe"
npm ci
npm run check
git push origin main
```

Se um comando falhar, pare e resolva antes do seguinte. Avise Leonardo para trazer a `main` à branch dele e terminar a ligação do modal. Em seguida, repita a revisão e a integração com `origin/codex/leonardo`:

```bash
git fetch origin
git switch --detach origin/codex/leonardo
npm ci
npm run check
git switch main
git pull --ff-only origin main
git merge --no-ff origin/codex/leonardo -m "integra interface e navegacao desenvolvidas por Leonardo"
npm ci
npm run check
git push origin main
```

Um conflito exige ler as duas alterações e manter os contratos combinados. Use `git status`, resolva os trechos marcados, adicione os arquivos resolvidos e finalize com `git merge --continue`. Se não for possível decidir corretamente, use `git merge --abort` e combine a solução antes de reiniciar o merge. Não faça force push nem apague a branch de ninguém.

Ajustes de implementação feitos por você também pertencem a `codex/gabriel`, não à `main`:

```bash
git switch codex/gabriel
git merge main
# Desenvolver o ajuste, verificar, adicionar os arquivos e fazer commit.
git push origin codex/gabriel
git switch main
git merge --no-ff codex/gabriel -m "integra ajustes de Gabriel"
git push origin main
```

## Antes da entrega única

Confira [VALIDACAO.md](VALIDACAO.md), teste com endpoint CrudCrud válido e verifique o histórico:

```bash
git fetch origin
git branch -r
git log --graph --oneline --decorate --all
```

Devem existir `main`, `codex/gabriel`, `codex/leonardo` e `codex/felipe`, com commits reais e merges. Branches dos colegas só devem ser criadas por eles quando começarem sua implementação; uma branch vazia criada antecipadamente não resolve esse requisito.

Gabriel fará a entrega única do link do repositório até **09/11/2026**, após a integração final. Confirmem que o professor consegue acessar o link. Publicar esta base no GitHub não equivale a enviar a atividade no ambiente da faculdade.
