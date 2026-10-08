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

As variáveis `VITE_` fazem parte do código enviado ao navegador. O `.env` fica fora do Git; não coloque senhas nem chaves privadas nele para uso pelo frontend.

## Verificar

```bash
npm run check
```

O comando executa ESLint, 62 testes Vitest e a compilação TypeScript/Vite. Os testes automatizados usam respostas simuladas da API e não consomem o limite do CrudCrud. A conferência manual com API real é registrada separadamente em [VALIDACAO.md](docs/VALIDACAO.md).

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

## Escopo das aulas

Referências fornecidas ao grupo: `exercicio_taskflow_git_github.pdf`, `aula_06_react.pdf`, `aula_06_continuacao_taskmodal_contexto_responsabilidades.pdf`, `react_conteudos.pdf` e `css_layout_box_model_apresentacao.pdf`.

O fluxo implementado no material é GET, POST e DELETE de tarefas, com um modal compartilhado. Edição, alteração de conclusão via PUT, projetos, preferências, busca avançada e notificações aparecem no protótipo ou como evoluções; não são apresentados aqui como requisitos já implementados. Evitem botões sem comportamento.

Entrega: **09/11/2026**, por um integrante, com o link deste repositório. Gabriel é o responsável pela integração e pela entrega única. A publicação no GitHub não substitui o envio do link no ambiente da faculdade. Antes da apresentação, obtenham um endpoint CrudCrud válido, pois o utilizado nos testes é temporário.
