# Verificação do TaskFlow

## Instabilidade 502 e confirmação de persistência — 09/10/2026

Uma tentativa posterior no Chrome em `http://localhost:5173/` apresentou POST com **502 Bad Gateway** e ausência de `Access-Control-Allow-Origin`. O servidor Vite ativo foi conferido: utilizava a pasta deste projeto e o mesmo endpoint válido do `.env`. Uma nova leitura retornou HTTP 200, CORS `*` e um registro do usuário já salvo com prazo anterior à data atual. Esse registro foi preservado; pela regra de filtro, pertence a Todas as tarefas e não à página Hoje.

O erro de comunicação não permite concluir que o servidor deixou de gravar. Por isso, os avisos agora dizem que não foi possível **confirmar** o cadastro ou a exclusão e orientam a recarregar a lista antes de repetir. Não há repetição automática de POST, que poderia duplicar um cadastro já persistido.

Um teste isolado adicional usou o pacote de navegador do Axios com adaptador XMLHttpRequest no jsdom e origem `http://localhost:5173/`. A primeira execução apresentou `ERR_NETWORK`. Depois que o serviço voltou a responder, a segunda execução confirmou GET 200, POST 201 e leitura do registro persistido. Somente o registro descartável desse teste foi removido; o registro do usuário permaneceu.

O teste XMLHttpRequest verifica também as regras CORS implementadas pelo jsdom, mas não equivale a controlar o Chrome. As ferramentas de navegador e de inspeção nativa continuaram falhando na inicialização. O erro do Chrome foi informado pelo usuário. Lint, 65 testes e build passaram após o ajuste dos avisos.

## Endpoint expirado e nova validação — 09/10/2026

Após o relato de falha no cadastro, uma consulta ao endpoint configurado no `.env` retornou **HTTP 400, `Endpoint has expired.`**. A resposta não incluía o cabeçalho CORS, de modo que o navegador pode apresentá-la como erro de rede. O endpoint temporário foi renovado somente no `.env` local, que permanece ignorado pelo Git.

As mensagens de falha de criação e exclusão agora orientam a conferir conexão e validade do endpoint e a atualizar `.env`/reiniciar o servidor quando necessário. A mensagem não afirma que toda falha decorre de expiração.

O próprio `tarefaService.ts` foi carregado pelo Vite e executado no Node, com Axios real e sem simulação de HTTP:

- GET inicial: coleção vazia.
- POST: uma tarefa descartável criada com identificador retornado pelo CrudCrud.
- Novo GET: confirmou que a tarefa foi persistida.
- OPTIONS com origem `http://localhost:5173`: HTTP 204 e cabeçalhos CORS permitindo POST.
- DELETE: apenas o registro descartável criado no teste foi removido.
- GET final: zero registros, confirmando a limpeza.

`npm run check` passou: lint, **65 testes em 7 arquivos** e build TypeScript/Vite. O novo teste de integração verifica que uma falha mantém o modal aberto e o título preenchido, exibe a orientação sobre o endpoint e permite salvar na tentativa seguinte.

Esta validação real do serviço não equivale a uma nova execução da interface no navegador. A ferramenta de navegador continua falhando na inicialização; a conferência visual renderizada permanece pendente. O endpoint renovado também é temporário e precisa estar válido na apresentação.

## Revisão visual e busca — 09/10/2026

A revisão partiu da versão integrada `31fcde9`, em `codex/gabriel`. O CSS do repositório do professor foi incorporado como base visual; os componentes foram adaptados para a lista em linhas, o cabeçalho com busca e os campos do modelo, preservando contexto, modal e operações da atividade. Veja a origem e as adaptações em [REFERENCIA_VISUAL.md](REFERENCIA_VISUAL.md).

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Aprovado. |
| `npm test` | 64 testes aprovados em 7 arquivos. |
| `npm run build` | TypeScript e build de produção Vite aprovados. |
| Busca | Testes de título, descrição, projeto, acentos, maiúsculas, limpeza e combinação com o filtro da página aprovados. |
| Arquitetura | Serviço HTTP e contexto preservados; Layout continua apresentando um único modal. |

O comando `npm run check` concluiu as três verificações. A busca é local à coleção já carregada e não acrescenta operações de persistência.

**Limite desta revisão:** a ferramenta de navegador falhou na inicialização. A comparação atual foi feita no TSX/CSS, sem nova inspeção renderizada, novas capturas ou repetição do teste com CrudCrud real. Os resultados e imagens de 08/10 abaixo são evidências históricas da integração anterior aos novos estilos, não uma validação visual desta revisão. A conferência renderizada do novo layout em desktop e celular permanece pendente.

## Integração e teste com API real — 08/10/2026

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

As capturas mostram a aparência anterior à adaptação visual de 09/10 e registros descartáveis durante o teste; eles foram removidos ao final.

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
- [x] Instalação validada em 08/10; lint, 65 testes e build aprovados em 09/10.
- [x] Contexto, serviço, páginas, cards, formulário e modal funcionam juntos.
- [x] GET/POST/DELETE conferidos com CrudCrud real e persistência após recarregar em 08/10.
- [x] Serviço GET/POST/DELETE e permissão CORS testados novamente com endpoint válido em 09/10, após diagnosticar a expiração.
- [x] Três gatilhos, bloqueio do fundo e foco cobertos novamente pelos testes automatizados em 09/10.
- [ ] Conferir o novo layout renderizado em desktop e celular; a inspeção anterior de responsividade é de 08/10.
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
