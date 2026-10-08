# Divisão e contrato entre as partes

## Ponto de partida

O repositório original tinha somente um README. Gabriel reconstruiu uma base executável conforme as aulas, em sua branch individual. Depois do merge dessa etapa, a `main` é o ponto de partida comum de Leonardo e Felipe.

Cada pessoa deve programar e fazer commits com sua própria identidade Git. Branch vazia não conta como participação. Não façam commits em nome de outro integrante e não usem a `main` para desenvolvimento individual.

## Arquivos e responsabilidades

| Pessoa | Arquivos principais | Resultado esperado |
| --- | --- | --- |
| Gabriel | Configurações da raiz; `src/types/Tarefa.ts`; `src/services/`; `src/contexts/`; provider em `src/App.tsx`; documentação | Tipos comuns, GET/POST/DELETE com Axios, estado compartilhado e tratamento de falhas. |
| Leonardo | `src/components/Layout/`, `Header/`, `Sidebar/`, `TaskCard/`, `TaskList/`; `src/pages/`; CSS desses componentes | Navegação, representação e exclusão de tarefas; botões de criação ligados a um modal compartilhado. |
| Felipe | `src/components/TaskForm/`, `src/components/TaskModal/`; CSS e testes correspondentes | Formulário controlado, validação, envio, cancelamento e modal sobre a interface. |

`src/styles/variables.css` e `global.css` são a base visual comum. Usem suas variáveis; novos estilos específicos ficam junto do componente. Alterações em tipos, contexto, serviço, dependências ou CSS global precisam ser combinadas para não quebrar a outra branch. Não adicionem bibliotecas sem necessidade: Axios, Lucide e React Router já estão instalados.

## Contratos que devem ser preservados

Todos importam de `src/types/Tarefa.ts`:

```ts
type Prioridade = 'high' | 'medium' | 'low';
type Tarefa = {
  _id?: string;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: Prioridade;
  projeto: string;
  concluida: boolean;
};
type NovaTarefa = Omit<Tarefa, '_id'>;
```

`data` usa `AAAA-MM-DD`, ou string vazia quando não há prazo. O formulário envia `concluida: false`. Os textos de prioridade são Alta, Média e Baixa, mas os valores persistidos são `high`, `medium` e `low`.

O hook é importado de `src/contexts/TarefasContext.tsx`:

```ts
const { tarefas, carregando, erro, adicionarTarefa, removerTarefa } = useTarefas();
// adicionarTarefa(novaTarefa): Promise<void>
// removerTarefa(id): Promise<void>
```

`adicionarTarefa` rejeita a Promise em caso de falha. O formulário deve capturar essa rejeição e preservar o que foi digitado. `removerTarefa` trata a falha em `erro`, como no exemplo do professor, e conserva o registro na lista. Não interpretem a resolução dessa função como confirmação de exclusão: o estado da coleção e `erro` são a fonte da interface.

Props dos componentes:

```ts
// Leonardo
type HeaderProps = { aoNovaTarefa: () => void };
type SidebarProps = { aoNovaTarefa: () => void };
type LayoutContext = { abrirTaskModal: () => void };
type TaskListProps = { tarefas: Tarefa[]; aoExcluir: (id: string) => Promise<void> };
type TaskCardProps = { tarefa: Tarefa; aoExcluir: (id: string) => Promise<void> };

// Felipe
type TaskFormProps = {
  aoSalvar: (tarefa: NovaTarefa) => Promise<void>;
  aoCancelar: () => void;
};
type TaskModalProps = { aberto: boolean; aoFechar: () => void };
```

Utilizem exports nomeados: `export function TaskForm`, `TaskModal`, `TaskCard`, etc. Os arquivos seguem o padrão `src/components/Nome/Nome.tsx` com CSS na mesma pasta. O tipo `LayoutContext` já está declarado em `Layout.tsx`; Leonardo fará a ligação do `Outlet`.

## Como as branches se encontram

1. Gabriel publica a base e seus dados por merge na `main` e mantém `codex/gabriel`.
2. Leonardo e Felipe criam suas branches a partir dessa mesma `main`.
3. Felipe desenvolve formulário/modal. Leonardo pode desenvolver cards, lista, páginas e estrutura em paralelo, sem importar arquivos que ainda não existem.
4. Gabriel revisa e faz merge da contribuição de Felipe na `main`.
5. Leonardo traz a `main` atualizada para sua branch com `git fetch origin` e `git merge origin/main`. Agora importa `TaskModal`, conclui a ligação no Layout e testa os três botões.
6. Gabriel revisa e faz merge da contribuição de Leonardo na `main`.
7. O grupo verifica o fluxo completo e apenas Gabriel envia o link na entrega.

As etapas 4 a 7 dependem das implementações dos colegas. Não estão concluídas pela publicação da base.

Usem merge com histórico preservado. Não usem squash, rebase ou force push para juntar as contribuições desta atividade. Não apaguem as branches após o merge.
