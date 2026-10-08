# Verificação do TaskFlow

## Resultado final — 08/10/2026

A versão integrada das contribuições de Gabriel, Felipe e Leonardo foi revisada em `codex/gabriel`, a partir da `main` no merge `6fb422b`. Não foram necessárias correções no código das contribuições. A documentação foi atualizada para refletir o estado consolidado, e as evidências desta validação foram acrescentadas pela branch de Gabriel.

### Instalação e verificações automatizadas

| Verificação | Resultado |
| --- | --- |
| `npm ci` | Aprovado; 264 pacotes instalados pelo lockfile. |
| Auditoria exibida na instalação | 0 vulnerabilidades informadas nessa execução. |
| `npm run lint` | Aprovado, sem avisos. |
| `npm test` | 62 testes aprovados em 7 arquivos. |
| `npm run build` | TypeScript e build de produção Vite aprovados. |

O comando `npm run check` executou lint, testes e build após a instalação. Os testes automatizados simulam o serviço HTTP: não são a evidência da persistência real descrita abaixo.

A cobertura inclui serviço/configuração, contexto compartilhado, campos e validação do formulário, bloqueio de envios repetidos, falha e nova tentativa, foco do modal, restauração do fundo, três gatilhos para um único modal, filtros por data local, carregamento/vazio/erro e exclusão que preserva a tarefa em caso de falha.

### Navegador e CrudCrud real

Foi gerado um endpoint gratuito temporário no CrudCrud e configurado somente no `.env` local, ignorado pelo Git. Os testes usaram o frontend da aplicação com Axios acessando o serviço real, sem proxy ou API simulada.

- GET exibiu inicialmente a coleção vazia.
- Header, Sidebar e Todas as tarefas abriram o mesmo modal; os três caminhos foram usados para cadastrar registros.
- Título composto apenas de espaços foi rejeitado sem fechar a janela.
- POST retornou a tarefa com `_id`; a lista foi atualizada e o modal fechou após o sucesso. Durante o envio, campos e botões ficaram desabilitados.
- Foram cadastradas três tarefas pelo formulário: sem prazo, com prazo futuro e com prazo no dia da validação.
- Um quarto registro descartável foi criado diretamente na API com `concluida: true` para conferir o filtro Concluídas. A interface não implementa alteração de conclusão/PUT.
- Após recarregar a página, os registros voltaram por GET. Hoje exibiu somente a tarefa pendente do dia; Próximas, a futura; Concluídas, a concluída; Todas as tarefas, as quatro.
- Os quatro registros foram excluídos pelos botões da aplicação. Os cards desapareceram após a resposta e a coleção ficou vazia.
- Um novo carregamento no navegador manteve a coleção vazia. Uma leitura independente na API confirmou HTTP 200 e **zero registros restantes**.
- Desktop em 1280px e celular em 390 × 844px: navegação, cards e modal conferidos, sem rolagem horizontal. O modal tem rolagem interna.
- Com o modal aberto havia exatamente um diálogo, fundo com `inert` e rolagem bloqueada. Tab/Shift+Tab permaneceram no diálogo; Escape fechou e devolveu o foco ao botão de origem.
- A leitura do console na conferência final não apresentou erros ou avisos.

**Ocorrência observada:** houve timeouts do CrudCrud durante a sessão; o dashboard do serviço também retornou 504. A aplicação exibiu a mensagem de falha de carregamento. Após o serviço voltar a responder, foi possível concluir a leitura e a exclusão persistidas. Isso não foi ocultado por dados locais. Falhas de POST/DELETE com preservação dos campos/registros foram cobertas pelos testes automatizados, sem afirmar que todos esses cenários foram induzidos no backend real.

### Evidências visuais

As capturas mostram registros descartáveis durante o teste; eles foram removidos ao final.

- [Coleção real no desktop](evidencias/desktop.jpg)
- [Interface em celular](evidencias/celular.jpg)
- [Modal em celular](evidencias/modal-celular.jpg)
- [Coleção vazia após exclusão e recarregamento](evidencias/apos-exclusao.jpg)

### Histórico colaborativo

| Integrante | Branch preservada | Conta associada aos commits | Integração |
| --- | --- | --- | --- |
| Gabriel | `codex/gabriel` | `Gabriel-Apolinario01` | Base no merge `83536f8`; revisão e documentação final em sua branch. |
| Felipe | `codex/felipe` | `Felipenar-x` | PR #1, merge `21db979`. |
| Leonardo | `codex/leonardo` | `Nicleo1112` | PR #2, merge `6fb422b`. |

A associação de autoria foi conferida pela API do GitHub. O repositório está público. Os merges anteriores foram mantidos e os ajustes finais de Gabriel seguem o mesmo fluxo de branch individual e merge para a `main`, sem squash, rebase ou force push.

## Conferência da entrega

- [x] As três contribuições possuem alterações e commits em branches individuais.
- [x] Os merges de Gabriel, Felipe e Leonardo permanecem no histórico.
- [x] Instalação, lint, 62 testes e build aprovados.
- [x] Contexto, serviço, páginas, cards, formulário e modal funcionam juntos.
- [x] GET/POST/DELETE conferidos com CrudCrud real e persistência após recarregar.
- [x] Três gatilhos, bloqueio do fundo, foco e responsividade conferidos.
- [x] Cenários de falha cobertos pelos testes automatizados; instabilidade real de GET observada.
- [x] `.env`, endpoint temporário, dependências e build não fazem parte dos arquivos versionados.
- [x] Documentação atualizada e evidências registradas.
- [x] Repositório público e histórico dos integrantes preservado.
- [ ] Gabriel envia uma única vez o link no ambiente da faculdade, até **09/11/2026**.

A publicação no GitHub não realiza a entrega na plataforma da faculdade. Antes da demonstração, confira a validade e o limite do endpoint; se necessário, gere outro em CrudCrud, atualize `.env`, reinicie `npm run dev` e repita cadastro/exclusão. Os dados do endpoint temporário não constituem uma base permanente.

## Etapas anteriores

- **Gabriel:** base e dados; 23 testes em dois arquivos. A validação inicial utilizava respostas HTTP simuladas.
- **Felipe:** formulário e modal; 21 testes acrescentados, totalizando 44. A prévia local anterior usava API temporária em memória.
- **Leonardo:** cards, páginas e integração visual; 18 testes acrescentados, totalizando os 62 da versão integrada.

Essas etapas são registros históricos; as pendências de integração nelas descritas foram resolvidas pela versão revisada acima.
