# Referência visual do TaskFlow

Revisão de Gabriel em 09/10/2026, na branch `codex/gabriel`.

## Origem

Base consultada: [prof-carmino-aulas/taskflow, commit bfbd24f](https://github.com/prof-carmino-aulas/taskflow/tree/bfbd24f5cdb9df4432e2c7e68d41e6dcd7640f00), publicado em 21/09/2026. Os estilos abaixo foram copiados desse material do professor e adaptados para a aplicação integrada do grupo:

- `src/styles/variables.css` e `src/styles/global.css`;
- `Layout.css`, `Header.css` e `Sidebar.css`;
- `TaskCard.css`, `TaskList.css` e `TaskForm.css`;
- `src/pages/Tasks/Tasks.css`.

Foram adotados a paleta índigo, as fontes e dimensões do modelo, a barra lateral de 272px e o cabeçalho de 64px no desktop, a busca no cabeçalho e a lista de tarefas em linhas dentro de um contêiner com borda. A marca usa o mesmo endereço de imagem externo do exemplo do professor; seu carregamento depende desse serviço.

## Adaptações para a atividade

O commit de referência contém uma etapa anterior das aulas: mantém os dados em `Tasks` e mostra o formulário dentro dessa página. A continuação fornecida em PDF exige contexto compartilhado e TaskModal. Por isso, a revisão visual preserva:

- `Layout` controlando a abertura de uma única instância do modal pelos três botões;
- coleção, carregamento, erros, criação e exclusão em `TarefasContext`;
- requisições Axios exclusivamente no serviço;
- `TaskModal` reutilizando `TaskForm`, com fundo bloqueado, controle de foco e fechamento após o POST bem-sucedido;
- quatro páginas usando a mesma coleção e seus filtros;
- estados de carregamento, erro, validação e envio/exclusão em andamento.

A navegação permanece visível e se reorganiza no celular. O CSS de referência ocultava a barra lateral sem implementar o controle para abri-la. O formulário recebeu a paleta e os campos do modelo, dentro do modal da continuação.

O campo de busca do exemplo passou a filtrar título, descrição e projeto da página atual, sem alterar a coleção. A pesquisa ignora acentos e maiúsculas e usa o parâmetro `q` da URL.

O exemplo apresenta ícones de edição e conclusão sem ações implementadas. Aqui, a exclusão é um botão funcional e a conclusão é um indicador. Edição e alteração de conclusão por PUT continuam fora do fluxo GET/POST/DELETE implementado nas aulas consultadas. As datas e prioridades permanecem legíveis em português.

Os commits originais dos três integrantes foram mantidos. Esta adaptação posterior foi realizada por Gabriel como parte da integração.

## Verificação

Lint, 64 testes e compilação TypeScript/Vite passaram após a adaptação. Dois novos testes cobrem a busca e sua combinação com os filtros das páginas. Os demais cobrem os contratos entre componentes, contexto e serviço.

A comparação desta revisão foi feita pelos arquivos TSX e CSS. A ferramenta de navegador falhou ao inicializar, impedindo uma nova inspeção renderizada e novas capturas. Portanto, não se afirma equivalência visual pixel a pixel. As imagens de 08/10 em `evidencias/` registram a versão anterior dos estilos. Consulte [VALIDACAO.md](VALIDACAO.md) para separar os testes atuais da validação anterior com CrudCrud real.
