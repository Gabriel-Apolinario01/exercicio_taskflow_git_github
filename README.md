# TaskFlow

Atividade de Desenvolvimento Mobile: desenvolvimento colaborativo com React, TypeScript, Git e GitHub.
Professor: José Carmino Gomes Jr. • Grupo: Gabriel, Leonardo e Felipe.

**Versão integrada:** as contribuições de Gabriel, Felipe e Leonardo estão reunidas na `main`. A aplicação permite listar, cadastrar e excluir tarefas no CrudCrud, navegar pelas quatro páginas e abrir um único modal pelos botões do Header, da Sidebar e de Todas as tarefas. Consulte o [registro de validação](docs/VALIDACAO.md) para os resultados e os limites dos testes.

## Divisão do trabalho

| Integrante | Branch individual | Responsabilidade |
| --- | --- | --- |
| Gabriel | `codex/gabriel` | Base Vite/React/TypeScript, tipos, serviço HTTP, contexto compartilhado, testes dos dados e merges de integração. |
| Leonardo | `codex/leonardo` | Layout, Header, Sidebar, páginas, TaskCard, TaskList e integração dos três botões com uma única instância do modal. |
| Felipe | `codex/felipe` | TaskForm, TaskModal, estilos, validação, envio assíncrono e interação acessível do modal. |

- [Divisão, contratos e regras comuns](docs/DIVISAO.md)
- [Roteiro de Leonardo](docs/LEONARDO.md)
- [Roteiro de Felipe](docs/FELIPE.md)
- [Parte de Gabriel e integração final](docs/GABRIEL.md)
- [Verificação e situação da entrega](docs/VALIDACAO.md)
- [Referência visual do professor e adaptações](docs/REFERENCIA_VISUAL.md)

As três branches individuais e seus commits foram preservados. A base de Gabriel entrou pelo merge `83536f8`; o formulário/modal de Felipe, pelo [PR #1](https://github.com/Gabriel-Apolinario01/exercicio_taskflow_git_github/pull/1); e a interface de Leonardo, pelo [PR #2](https://github.com/Gabriel-Apolinario01/exercicio_taskflow_git_github/pull/2). Gabriel revisou a integração e registrou a validação final em sua branch. Mantenham as branches depois dos merges.

## Executar

Pré-requisito recomendado: Node.js 24 LTS. A série 22 também é aceita a partir de 22.13. Use npm.

```bash
git clone https://github.com/Gabriel-Apolinario01/exercicio_taskflow_git_github.git
cd exercicio_taskflow_git_github
npm ci
```

Copie `.env.example` para `.env`. No PowerShell:

```powershell
Copy-Item .env.example .env
```

Em macOS/Linux: `cp .env.example .env`.

Abra [CrudCrud](https://crudcrud.com/), obtenha um endpoint válido e substitua o exemplo em `.env`:

```dotenv
VITE_API_URL=https://crudcrud.com/api/SEU_ENDPOINT
```

Não acrescente `/tarefas`: o serviço já adiciona esse recurso. Reinicie `npm run dev` após alterar `.env`. O endpoint é temporário e tem limites; confira sua validade antes dos testes e da apresentação. Para visualizar os mesmos registros nos três computadores, combinem o mesmo endpoint.

```bash
npm run dev
```

Abra o endereço exibido pelo Vite. Sem endpoint configurado, a navegação continua funcionando e a página **Todas as tarefas** informa a configuração pendente. Não existe substituição silenciosa por dados fictícios ou por armazenamento local.

**Cadastrar tarefas precisa funcionar.** Se o CrudCrud informar `Endpoint has expired`, gere um endpoint novo, atualize `VITE_API_URL` no `.env`, encerre o Vite com Ctrl+C e execute `npm run dev` novamente. Recarregue a página. Uma tarefa sem prazo aparece em **Todas as tarefas**; **Hoje** mostra apenas as pendentes com prazo na data atual. Trocar o endpoint inicia outra coleção e não recupera os registros do endpoint expirado.

Erros **502/504** indicam falha na comunicação do gateway com o serviço e podem vir acompanhados de erro CORS no navegador. Isso não comprova que o endpoint expirou nem que o cadastro não foi salvo. Abra **Todas as tarefas** e recarregue antes de tentar cadastrar novamente, para conferir a persistência e evitar duplicatas. Uma tarefa com prazo anterior ao dia atual também aparece somente em **Todas as tarefas**. A aplicação não repete POST automaticamente nem substitui a persistência real por dados locais.

As variáveis `VITE_` fazem parte do código enviado ao navegador. O `.env` fica fora do Git; não coloque senhas nem chaves privadas nele para uso pelo frontend.

## Verificar

```bash
npm run check
```

O comando executa ESLint, 65 testes Vitest e a compilação TypeScript/Vite. Os testes automatizados usam respostas simuladas da API e não consomem o limite do CrudCrud. Os testes com API real são registrados separadamente em [VALIDACAO.md](docs/VALIDACAO.md).

Comandos individuais: `npm run lint`, `npm test`, `npm run build` e `npm run preview`.

## Arquitetura

```text
App
└── BrowserRouter
    └── TarefasProvider: tarefas, carregando, erro, adicionarTarefa, removerTarefa
        └── Routes
            └── Layout: Sidebar + Header + Outlet + um TaskModal

TaskModal → TaskForm → aoSalvar → adicionarTarefa → tarefaService → CrudCrud
Tasks → TaskList → TaskCard → aoExcluir → removerTarefa → tarefaService → CrudCrud
```

O Layout controla apenas a apresentação do modal. A coleção e as operações pertencem ao contexto. Os componentes visuais não fazem requisições HTTP.

| Página | Rota | Conteúdo |
| --- | --- | --- |
| Hoje | `/` | Tarefas pendentes com prazo igual à data local atual. |
| Próximas | `/proximas` | Tarefas pendentes com prazo posterior à data local atual. |
| Todas as tarefas | `/tarefas` | Coleção completa, inclusive atrasadas, concluídas e sem prazo. |
| Concluídas | `/concluidas` | Registros persistidos com `concluida: true`. |

Todas as páginas reutilizam TaskList/TaskCard e o mesmo contexto, com carregamento, vazio e erro. A criação aguarda a API antes de fechar o modal; a exclusão aguarda a API antes de retirar o card. Uma falha preserva os dados do formulário ou a tarefa existente.

A busca do cabeçalho filtra título, descrição e projeto dentro da página atual, ignorando maiúsculas e acentos. O termo fica no parâmetro `q` da URL; limpar a busca restaura a lista da página, e navegar pelo menu inicia a outra página sem esse termo. A busca não altera os registros nem faz novas requisições.

## Referência visual

O CSS do [TaskFlow do professor](https://github.com/prof-carmino-aulas/taskflow/tree/bfbd24f5cdb9df4432e2c7e68d41e6dcd7640f00) foi incorporado como base visual: cores, tipografia, menu lateral, cabeçalho com busca, lista em linhas e campos do formulário. As adaptações preservam a navegação no celular e o modal compartilhado da continuação da aula. A origem dos arquivos e as diferenças estão em [REFERENCIA_VISUAL.md](docs/REFERENCIA_VISUAL.md).

A aplicação é escrita em **TypeScript (`.ts` e `.tsx`) com React**, usando CSS para os estilos. `eslint.config.js` é a configuração da ferramenta de análise; não representa uma troca da linguagem da aplicação.

## Escopo das aulas

Referências fornecidas ao grupo: `exercicio_taskflow_git_github.pdf`, `aula_06_react.pdf`, `aula_06_continuacao_taskmodal_contexto_responsabilidades.pdf`, `react_conteudos.pdf` e `css_layout_box_model_apresentacao.pdf`.

O fluxo implementado no material é GET, POST e DELETE de tarefas, com um modal compartilhado. Edição, alteração de conclusão via PUT, projetos, preferências, busca avançada e notificações aparecem no protótipo ou como evoluções; não são apresentados aqui como requisitos já implementados. Evitem botões sem comportamento.

Entrega: **09/11/2026**, por um integrante, com o link deste repositório. Gabriel é o responsável pela integração e pela entrega única. A publicação no GitHub não substitui o envio do link no ambiente da faculdade. Antes da apresentação, obtenham um endpoint CrudCrud válido, pois o utilizado nos testes é temporário.
