# Verificação do TaskFlow

## Etapa de Gabriel - 08/10/2026

- ESLint: aprovado, sem avisos.
- Vitest: 23 testes aprovados em dois arquivos.
- TypeScript + Vite: build de produção aprovado.
- Navegador: quatro rotas acessíveis, navegação ativa, estrutura permanente preservada e mensagem de configuração ausente em Todas as tarefas.
- Console da base: sem erros ou avisos na navegação verificada.
- Layout da base: conferido em 1280px e 390px, sem rolagem horizontal.

Os testes cobrem GET/POST/DELETE, configuração inválida, resposta inválida, criação sem envio de `_id`, erros de rede, carregamento, atualização após persistência, preservação de tarefas em falhas, tentativa posterior, consumidores compartilhados e limpeza de efeitos no StrictMode.

**Limite desta validação:** as respostas HTTP dos testes são simuladas. Nenhum endpoint real do CrudCrud foi fornecido/configurado nesta etapa. Não foi validado ainda o fluxo visual de cadastrar e excluir com backend real, porque TaskForm/TaskModal e TaskCard/TaskList pertencem às contribuições que faltam. A base não é a aplicação final do grupo.

## Conferência após os merges dos colegas

- [ ] Todos fizeram alterações reais e commits próprios em suas branches.
- [ ] Os merges de cada contribuição aparecem no histórico da `main`.
- [ ] `npm ci` e `npm run check` passam em um clone atualizado.
- [ ] `.env` contém um endpoint CrudCrud válido e sem `/tarefas` no final.
- [ ] GET carrega a coleção, com estados de carregamento, vazio e erro visíveis.
- [ ] Header, Sidebar e Tasks abrem a mesma instância de TaskModal.
- [ ] Modal bloqueia cliques e navegação de teclado para elementos ao fundo.
- [ ] Formulário permanece interativo; título inválido não envia.
- [ ] Enquanto salva, não há cadastro duplicado nem fechamento prematuro.
- [ ] POST bem-sucedido retorna `_id`, atualiza a lista e só então fecha o modal.
- [ ] POST com falha preserva a janela e os campos e exibe uma mensagem.
- [ ] X e Cancelar fecham a janela; Escape e foco são tratados corretamente.
- [ ] Fechado, o modal não deixa overlay invisível nem bloqueio de rolagem.
- [ ] DELETE bem-sucedido remove a tarefa; falha preserva a tarefa e informa erro.
- [ ] Recarregar a página confirma a persistência real de criação e exclusão.
- [ ] As quatro páginas e os critérios combinados funcionam com a mesma coleção.
- [ ] A interface funciona em desktop e celular, sem cortes ou rolagem horizontal.
- [ ] Não há botões que anunciem ações não implementadas.
- [ ] O professor consegue abrir o repositório; branches e histórico permanecem disponíveis.
- [ ] Um único integrante envia o link no ambiente de entrega até 09/11/2026.

Registrem aqui o resultado real da validação final, incluindo a data. Não marquem itens pendentes só porque os testes da camada de dados passaram.
