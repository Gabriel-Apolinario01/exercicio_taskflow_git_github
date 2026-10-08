# Leonardo: interface, páginas e ligação do modal

Branch: `codex/leonardo`. A contribuição foi concluída e integrada pelo PR #2, merge `6fb422b`. Os commits `318cb88`, `e491883` e `ac92b64` estão associados à conta `Nicleo1112` no GitHub.

Foram implementados TaskCard/TaskList, a abertura de um único modal pelos três botões e as quatro páginas com filtros sobre o contexto compartilhado. Leonardo acrescentou 18 testes de cards, páginas e integração. A validação final está em [VALIDACAO.md](VALIDACAO.md). As seções seguintes preservam o roteiro original, já implementado.

## Começar

Você precisa ter acesso de colaborador ao repositório e usar sua própria conta GitHub. Se ainda não tiver acesso, envie seu usuário do GitHub ao Gabriel para receber o convite.

```bash
git clone https://github.com/Gabriel-Apolinario01/exercicio_taskflow_git_github.git
cd exercicio_taskflow_git_github
git switch main
git pull --ff-only origin main
git switch -c codex/leonardo
npm ci
```

Se já clonou o repositório, pule o clone e entre na pasta existente. Se sua branch já existir, use `git switch codex/leonardo` em vez de recriá-la. Confira `git config user.name` e `git config user.email`; eles devem ser seus. Siga o README para criar `.env` e iniciar a aplicação.

## O que implementar

1. **TaskCard e TaskList.** Crie os componentes e seus CSS. TaskCard recebe `tarefa` e `aoExcluir`, mostra título, descrição, prazo, projeto, prioridade e estado de conclusão. TaskList recebe a coleção e repassa a função de exclusão. Use `_id` como `key`. Trate coleção vazia. O botão Excluir só chama `aoExcluir` se houver `_id`, aguarda a operação e evita duplo clique enquanto estiver excluindo. Não faça Axios/fetch nesses componentes.
2. **Página Tasks.** Substitua o resumo simples da base por `TaskList`. Obtenha `tarefas`, `carregando`, `erro` e `removerTarefa` com `useTarefas()`. Exiba carregamento e erro; uma falha ao excluir não deve esconder os registros existentes. Passe `removerTarefa` para `aoExcluir`.
3. **Outras páginas.** Reutilize TaskList para Hoje, Próximas e Concluídas. Hoje: não concluídas com prazo igual à data local atual. Próximas: não concluídas com prazo posterior ao dia atual. Concluídas: `concluida === true`. Todas as tarefas: coleção inteira, incluindo tarefas sem prazo e atrasadas. Não crie outra cópia do estado das tarefas. Para data local, não use `toISOString()` sem considerar o fuso, nem `new Date('AAAA-MM-DD')` para formatar o prazo; isso pode deslocar o dia. Um prazo vazio deve ser exibido como “Sem prazo”.
4. **Header e Sidebar.** Adicione a prop obrigatória `aoNovaTarefa` e o botão “Nova tarefa”. Preserve as quatro rotas e a navegação ativa. Não crie modal dentro desses componentes.
5. **Layout e abertura compartilhada.** Após obter o componente de Felipe, mantenha `taskModalAberto` no Layout com `useState`. Crie `abrirTaskModal` e `fecharTaskModal`. Passe a abertura aos dois componentes acima e ao `Outlet` usando `context={{ abrirTaskModal }}`. Renderize apenas um `<TaskModal aberto={taskModalAberto} aoFechar={fecharTaskModal} />`, fora da área que deve ficar bloqueada pelo modal.
6. **Botão da página Tasks.** Use `useOutletContext<LayoutContext>()` para obter `abrirTaskModal` e chamá-lo no terceiro botão “Nova tarefa”. Não guarde outro estado de abertura na página.
7. **CSS e acessibilidade.** Mantenha o estilo claro com destaque roxo das aulas, classes por componente, `border-box`, Flexbox/Grid e media queries. Confira desktop e celular sem rolagem horizontal. Use labels acessíveis nos botões de ícone e foco visível pelo teclado.

Consulte os contratos em [DIVISAO.md](DIVISAO.md). Você pode trabalhar nos itens 1 a 4 enquanto Felipe programa. Não deixe imports inexistentes em um commit destinado à integração. Quando Gabriel avisar que Felipe já está na `main`:

```bash
git fetch origin
git merge origin/main
npm ci
```

Finalize então os itens 5 e 6. Se aparecer conflito, revise o arquivo junto com Gabriel; não aceite automaticamente uma versão inteira. A coleção e o acesso HTTP continuam no contexto e no serviço.

Não é necessário criar funcionalidades de edição, PUT/conclusão, projetos ou preferências nesta divisão. Exiba o estado de conclusão como informação, sem um botão que promete alterar algo que não está implementado. Busca no Header e indicadores são extras e só devem aparecer como interações se funcionarem.

## Commits por etapas reais

Faça o commit depois de implementar e conferir cada etapa. Exemplos de mensagens:

```text
implementa TaskCard e TaskList com exclusao por callback
conecta paginas de tarefas ao contexto compartilhado
integra abertura unica do TaskModal no Layout Header e Sidebar
ajusta responsividade e acessibilidade da interface
```

Antes de cada commit, rode `git status` e `git diff`; adicione os arquivos da etapa. Exemplo, depois de concluir os cards:

```bash
git add src/components/TaskCard src/components/TaskList
git commit -m "implementa TaskCard e TaskList com exclusao por callback"
git push -u origin codex/leonardo
```

## Antes de avisar ao Gabriel

- Execute `npm run check`.
- Navegue pelas quatro rotas: Header e Sidebar devem permanecer montados.
- Com endpoint válido, confira lista, estado vazio, falha de rede e exclusão persistida após recarregar.
- Depois de integrar Felipe, abra o mesmo modal pelos três botões.
- Crie uma tarefa e verifique a atualização imediata da lista, sem recarregar a página.
- Confira 390px e desktop; teste a navegação pelo teclado.
- Faça `git push origin codex/leonardo` e mande ao Gabriel o nome da branch e o resumo do que testou. Não faça merge sozinho na `main`.

Base do professor: aula 06, seções de Layout, páginas, TaskCard/TaskList e exclusão; continuação, seções 7 a 11; slides de CSS para layout e responsividade. Os filtros das outras páginas são a evolução atribuída a você; no PDF elas começam com conteúdo mínimo.
