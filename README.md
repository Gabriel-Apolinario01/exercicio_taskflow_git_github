# TaskFlow

Atividade de Desenvolvimento Mobile: desenvolvimento colaborativo com React, TypeScript, Git e GitHub.
Professor: José Carmino Gomes Jr. • Grupo: Gabriel, Leonardo e Felipe.

**Situação desta branch (`codex/felipe`):** base comum e camada de dados de Gabriel disponíveis; TaskForm e TaskModal implementados e testados. A interface de Leonardo e a ligação dos três botões ao modal ainda precisam ser desenvolvidas. Os componentes de Felipe estão prontos para revisão e merge; esta etapa não é a entrega final do grupo.

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

Leonardo e Felipe devem criar suas próprias branches a partir da `main`, desenvolver sua parte e publicar seus próprios commits. As branches individuais devem permanecer no repositório depois dos merges.

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

O comando executa ESLint, os testes Vitest e a compilação TypeScript/Vite. Os testes usam respostas simuladas da API e não consomem o limite do CrudCrud. O formulário e o modal também foram conferidos em uma prévia local com API de teste. Ainda é necessário testar o fluxo completo com endpoint CrudCrud real após a ligação da interface e os merges.

Comandos individuais: `npm run lint`, `npm test`, `npm run build` e `npm run preview`.

## Arquitetura

```text
App
└── BrowserRouter
    └── TarefasProvider: tarefas, carregando, erro, adicionarTarefa, removerTarefa
        └── Routes
            └── Layout: Sidebar + Header + Outlet + um TaskModal (após integração)

TaskModal → TaskForm → aoSalvar → adicionarTarefa → tarefaService → CrudCrud
Tasks → TaskList → TaskCard → aoExcluir → removerTarefa → tarefaService → CrudCrud
```

O Layout controla apenas a apresentação do modal. A coleção e as operações pertencem ao contexto. Os componentes visuais não fazem requisições HTTP.

As rotas são `/`, `/proximas`, `/tarefas` e `/concluidas`. Nesta base, Hoje, Próximas e Concluídas têm a estrutura inicial da aula; Todas as tarefas já consome o contexto e apresenta carregamento, erro e um resumo simples. Leonardo completará a representação e as ações, incluindo a renderização de uma única instância do TaskModal já implementado por Felipe. Os botões de cadastro ainda não estão ligados na aplicação principal.

## Escopo das aulas

Referências fornecidas ao grupo: `exercicio_taskflow_git_github.pdf`, `aula_06_react.pdf`, `aula_06_continuacao_taskmodal_contexto_responsabilidades.pdf`, `react_conteudos.pdf` e `css_layout_box_model_apresentacao.pdf`.

O fluxo implementado no material é GET, POST e DELETE de tarefas, com um modal compartilhado. Edição, alteração de conclusão via PUT, projetos, preferências, busca avançada e notificações aparecem no protótipo ou como evoluções; não são apresentados aqui como requisitos já implementados. Evitem botões sem comportamento.

Entrega: **09/11/2026**, por um integrante, com o link deste repositório. Antes de entregar, a `main` precisa conter as três contribuições integradas e verificadas, com histórico de commits e merges disponível.
