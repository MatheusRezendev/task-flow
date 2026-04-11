# Task Flow - Roadmap de Estudo

## Objetivo

Construir um app de tarefas para praticar:

- fundamentos de React
- hooks mais usados
- separacao de responsabilidades
- estado local
- estado global com Zustand
- organizacao de projeto inspirada no `vite-project`

Este arquivo acompanha o estado real do projeto.
Ele deve refletir o que ja foi feito e quais sao os proximos passos.

---

## Estado Atual do Projeto

### Ja concluido

- base do projeto configurada com React + Vite + Tailwind
- componentes shadcn adicionados
- tema visual base ajustado
- tipo `Task` criado em `src/types/task.ts`
- tipo `TaskStats` criado em `src/types/taskStats.ts`
- mocks isolados criados em `src/lib/mockTasks.ts`
- `TaskForm` criado visualmente
- `TaskList` criada visualmente
- `TaskItem` criado visualmente
- `TaskStats` criada visualmente
- `Dialog` ja esta controlado com `useState`
- `TaskForm` ja usa estado local para os campos
- `TaskForm` ja faz submit controlado
- `tasks` ja estao no estado local do `App.tsx`
- `App.tsx` ja centraliza os handlers principais da lista
- `TaskStats` recebe props reais
- `TaskStats` ja reage ao estado real
- `TaskList` recebe `tasks` por props
- `TaskItem` ja renderiza dentro de `TaskList`
- botao `New Task` ja existe em `TaskList`
- `TaskForm` ja abre via `Dialog`
- criacao real de tarefas ja funciona
- remocao de tarefa ja funciona
- toggle de tarefa concluida ja funciona
- `TaskList` ja alterna entre estado vazio e estado real

### Parcial

- fluxo local principal ja funciona, mas ainda sem persistencia
- `tasks` ainda iniciam vazias no `App.tsx`, entao falta decidir entre manter vazio, usar `MOCK_TASKS` ou carregar do `localStorage`
- busca e filtro ainda nao existem, entao a lista completa ainda cresce sem camada de visualizacao

### Ainda nao iniciado

- persistencia com `localStorage`
- foco automatico no formulario
- filtros
- busca
- compartilhamento de estado de interface com `useContext`
- memoizacao de dados derivados
- hooks customizados
- Zustand

---

## Estrutura de Tela Atual

```txt
App
  TaskStats
  TaskList
    header da lista
    contador
    botao "New Task"
    Dialog
      TaskForm
    estado vazio ou lista
      TaskItem
      TaskItem
      TaskItem
```

### Responsabilidade de cada componente

#### `TaskStats`

- mostra resumo rapido das tarefas
- fica no topo
- recebe dados por props

#### `TaskList`

- e a secao principal da lista
- mostra titulo, descricao e contador
- mostra botao `New Task`
- controla a abertura do `Dialog`
- renderiza os `TaskItem`
- mostra estado vazio quando nao houver tarefas

#### `TaskItem`

- representa uma tarefa individual
- mostra titulo, descricao, status e data
- ja recebe acoes por props
- ja pode remover a tarefa
- ja pode alternar o status da tarefa

#### `TaskForm`

- aparece dentro de `Dialog`
- e responsavel pelos campos e envio do formulario
- ja controla estado local dos campos
- ja envia os dados para criar tarefa

---

## Comandos Base

Executar dentro de `task-flow`.

### Rodar o projeto

```bash
npm run dev
```

### Gerar build

```bash
npm run build
```

### Rodar lint

```bash
npm run lint
```

### Adicionar componentes shadcn se faltar algo

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add checkbox
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add dialog
```

### Instalar Zustand quando chegar a etapa

```bash
npm install zustand
```

---

## Estrutura Alvo

```txt
src/
  components/
    TaskForm.tsx
    TaskList.tsx
    TaskItem.tsx
    TaskStats.tsx
    TaskToolbar.tsx
    ThemeToggle.tsx

  contexts/
    task-view-context.tsx

  hooks/
    use-task-filter.ts
    use-task-search.ts
    use-local-storage.ts

  store/
    task-store.ts
    theme-store.ts

  types/
    task.ts
    taskStats.ts

  lib/
    utils.ts
    mockTasks.ts

  App.tsx
  main.tsx
  index.css
```

---

## Proximos Passos Imediatos

A base com estado local ja funciona.
Agora o foco muda para persistencia, refinamento de UX, filtro, busca e preparacao para `Zustand`.

### Passo 1 - Controlar o `Dialog` com `useState` `concluido`

#### Meta

Parar de depender apenas do comportamento visual do `Dialog` e passar a controlar sua abertura.

#### O que fazer

1. criar estado local para abertura
2. passar `open` e `onOpenChange`
3. conectar isso ao `TaskList`

#### Estrutura base

```tsx
const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
```

```tsx
<Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
  ...
</Dialog>
```

#### Aprendizado

- controle de componente externo
- estado local de interface

#### Tarefas detalhadas

1. criar `isCreateTaskOpen` no componente que controla o `Dialog`
2. passar `open={isCreateTaskOpen}` para `Dialog`
3. passar `onOpenChange={setIsCreateTaskOpen}` para `Dialog`
4. testar se o botao `New Task` abre o modal
5. testar se fechar o modal tambem atualiza o estado

#### Resultado esperado

O `Dialog` abre e fecha de forma controlada pelo React, e nao apenas pelo comportamento interno do componente.

---

### Passo 2 - Transformar `TaskForm` em formulario controlado `concluido`

#### Meta

Fazer os campos do formulario terem estado real.

#### O que fazer

1. criar estado para `title`
2. criar estado para `description`
3. usar `value`
4. usar `onChange`
5. criar `handleSubmit`

#### Estruturas base

```tsx
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
```

```tsx
const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
}
```

#### Aprendizado

- formulario controlado
- manipulacao de eventos

#### Tarefas detalhadas

1. criar `title` e `setTitle`
2. criar `description` e `setDescription`
3. adicionar `value={title}` no input de titulo
4. adicionar `value={description}` no input de descricao
5. adicionar `onChange` nos dois campos
6. criar `handleSubmit`
7. ligar `handleSubmit` ao `form`
8. testar digitacao nos inputs
9. confirmar que o submit nao recarrega a pagina

#### Resultado esperado

O `TaskForm` passa a refletir exatamente o que o usuario digita, e o submit do formulario deixa de depender apenas de layout.

---

### Passo 3 - Criar tarefas de verdade com `useState` `concluido`

#### Meta

Parar de depender apenas dos mocks e começar a criar novas tarefas durante a execucao.

#### O que fazer

1. mover `tasks` para estado local no `App.tsx`
2. inicializar esse estado com `MOCK_TASKS`
3. criar funcao para adicionar tarefa
4. passar essa funcao para o `TaskForm`

#### Estruturas base

```tsx
const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
```

```tsx
const handleAddTask = (title: string, description: string) => {}
```

#### Aprendizado

- arrays no estado
- elevacao de estado para o componente pai

#### Tarefas detalhadas

1. mover `tasks` para o `App.tsx`
2. inicializar `tasks` com `MOCK_TASKS`
3. criar `handleAddTask`
4. dentro de `handleAddTask`, montar uma nova task com:
   - `id`
   - `title`
   - `description`
   - `completed: false`
   - `createdAt: new Date()`
5. usar `setTasks` para adicionar a nova task ao array
6. passar `tasks` atualizados para `TaskList`
7. passar a funcao de submit para o `TaskForm`

#### Resultado esperado

Ao enviar o formulario, uma nova tarefa aparece na lista sem recarregar a pagina.

---

### Passo 4 - Fechar o `Dialog` apos criar tarefa `concluido`

#### Meta

Melhorar o fluxo de uso.

#### O que fazer

1. ao submeter o formulario, criar a nova tarefa
2. limpar os campos
3. fechar o `Dialog`

#### Estrutura base

```tsx
setTitle("")
setDescription("")
setIsCreateTaskOpen(false)
```

#### Tarefas detalhadas

1. apos adicionar a tarefa, limpar `title`
2. limpar `description`
3. fechar o `Dialog`
4. testar se a task aparece e o modal fecha

#### Resultado esperado

Depois do submit, o modal fecha e o formulario volta vazio para a proxima criacao.

---

### Passo 5 - Fazer `TaskStats` reagir ao estado real `concluido`

#### Meta

Parar de pensar stats como valor estatico e passar a derivar a partir de `tasks`.

#### O que fazer

1. calcular `total`
2. calcular `completed`
3. calcular `pending`
4. passar esses valores para `TaskStats`

#### Estruturas base

```tsx
const total = tasks.length
const completed = tasks.filter((task) => task.completed).length
const pending = total - completed
```

#### Aprendizado

- dado derivado
- diferenca entre estado e calculo

#### Tarefas detalhadas

1. parar de calcular stats com base em constante fixa fora do fluxo real
2. usar `tasks` do estado atual
3. calcular `total`
4. calcular `completed`
5. calcular `pending`
6. passar esses valores para `TaskStats`
7. testar se os numeros mudam ao adicionar tarefa

#### Resultado esperado

O `TaskStats` deixa de ser estatico e passa a refletir o estado atual da lista.

---

### Passo 6 - Adicionar a primeira interacao do `TaskItem` `concluido`

#### Meta

Dar o primeiro comportamento real para cada tarefa.

#### O que fazer

Escolher uma das duas opcoes:

1. remover tarefa
2. alternar `completed`

#### Estruturas base

```tsx
const handleRemoveTask = (taskId: string) => {}
```

```tsx
const handleToggleTask = (taskId: string) => {}
```

#### Tarefas detalhadas

Escolher apenas uma opcao primeiro:

##### Opcao A - Remover tarefa

1. criar `handleRemoveTask`
2. usar `setTasks` para remover a task pelo `id`
3. passar a funcao para `TaskItem`
4. adicionar um botao visual de remover no `TaskItem`
5. testar se o item some da lista

##### Opcao B - Alternar concluido

1. criar `handleToggleTask`
2. usar `setTasks` para atualizar apenas a task clicada
3. passar a funcao para `TaskItem`
4. adicionar controle visual no `TaskItem`
5. testar se o status muda

#### Resultado esperado

O `TaskItem` deixa de ser apenas visual e passa a ter a primeira acao real.

---

### Passo 7 - Persistir tarefas com `useEffect`

#### Meta

Fazer o app manter as tarefas mesmo depois de recarregar a pagina.

#### O que fazer

1. carregar tarefas salvas ao iniciar
2. salvar tarefas sempre que `tasks` mudar
3. manter fallback para `MOCK_TASKS` quando ainda nao houver dados salvos

#### Estruturas base

```tsx
useEffect(() => {
  const storedTasks = localStorage.getItem("task-flow:tasks")
}, [])
```

```tsx
useEffect(() => {
  localStorage.setItem("task-flow:tasks", JSON.stringify(tasks))
}, [tasks])
```

#### Aprendizado

- efeitos colaterais
- sincronizacao com fonte externa
- persistencia simples no navegador

#### Tarefas detalhadas

1. definir uma chave de `localStorage`
2. ler o valor salvo na inicializacao
3. converter o valor salvo para array de tarefas
4. tratar o caso em que ainda nao existe nada salvo
5. salvar novamente sempre que `tasks` mudar
6. testar recarregando a pagina
7. confirmar que criar, remover e alternar status continua funcionando apos reload

#### Resultado esperado

As tarefas continuam existindo mesmo depois de atualizar a pagina.

---

### Passo 8 - Melhorar o formulario com `useRef`

#### Meta

Praticar referencia ao DOM com um caso real de usabilidade.

#### O que fazer

1. criar referencia para o input de titulo
2. focar automaticamente esse campo quando o modal abrir

#### Estruturas base

```tsx
const titleInputRef = useRef<HTMLInputElement | null>(null)
```

```tsx
titleInputRef.current?.focus()
```

#### Aprendizado

- acesso imperativo ao DOM
- foco programatico
- melhoria de experiencia de uso

#### Tarefas detalhadas

1. criar `titleInputRef`
2. conectar a referencia ao input de titulo
3. disparar o foco quando o `Dialog` abrir
4. testar se o cursor cai direto no campo correto
5. confirmar que o fluxo de submit continua funcionando

#### Resultado esperado

Ao abrir o modal, o usuario pode comecar a digitar imediatamente no campo principal.

---

### Passo 9 - Compartilhar estado de interface com `useContext`

#### Meta

Evitar prop drilling quando filtro, busca e visualizacao passarem a ser usados em varios componentes.

#### O que fazer

1. criar um contexto para preferencias de visualizacao
2. compartilhar `filter`
3. compartilhar `search`
4. preparar espaco para ordenacao ou modo de visualizacao

#### Estruturas base

```tsx
const TaskViewContext = createContext<TaskViewContextValue | null>(null)
```

```tsx
const value = {
  filter,
  setFilter,
  search,
  setSearch,
}
```

#### Aprendizado

- estado compartilhado entre componentes
- reducao de prop drilling
- diferenca entre estado de dominio e estado de interface

#### Tarefas detalhadas

1. criar `task-view-context.tsx`
2. definir provider e hook de consumo
3. mover `filter` e `search` para esse contexto
4. consumir o contexto em uma toolbar da lista
5. consumir o contexto onde a lista filtrada for calculada
6. testar se mudar filtro e busca atualiza a interface inteira

#### Resultado esperado

Filtro e busca deixam de depender de props encadeadas e passam a ser compartilhados de forma clara.

---

### Passo 10 - Extrair filtros e busca para hooks customizados com `useMemo`

#### Meta

Separar logica de derivacao e praticar composicao de hooks.

#### O que fazer

1. criar `useTaskFilter`
2. criar `useTaskSearch`
3. usar `useMemo` para derivar listas
4. reaproveitar a logica fora dos componentes visuais

#### Estruturas base

```tsx
const filteredTasks = useMemo(() => {
  return tasks.filter((task) => task.completed)
}, [tasks])
```

#### Aprendizado

- dado derivado com memoizacao
- separacao entre regra e apresentacao
- criacao de hooks customizados

#### Tarefas detalhadas

1. criar `use-task-filter.ts`
2. criar `use-task-search.ts`
3. mover a logica de filtro para dentro do hook
4. mover a logica de busca para dentro do hook
5. combinar os resultados no fluxo da lista
6. testar busca, filtro e combinacao entre os dois

#### Resultado esperado

O componente visual fica menor e a logica de lista passa a ser reutilizavel e mais facil de entender.

---

### Passo 11 - Migrar o estado de tarefas para Zustand

#### Meta

Trocar a origem do estado global depois que o fluxo local ja estiver bem entendido.

#### O que fazer

1. instalar `zustand`
2. criar store de tarefas
3. mover `tasks` e as actions para a store
4. adaptar os componentes para consumir a store

#### Estruturas base

```tsx
const useTaskStore = create((set) => ({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  toggleTask: () => {},
}))
```

#### Aprendizado

- estado global com store simples
- diferenca entre contexto e store
- migracao gradual sem mudar a UI inteira

#### Tarefas detalhadas

1. instalar `zustand`
2. criar `src/store/task-store.ts`
3. mover `tasks`, `addTask`, `removeTask` e `toggleTask`
4. atualizar `App.tsx` para deixar de ser a fonte principal desse estado
5. manter `TaskItem`, `TaskList` e `TaskStats` com responsabilidades parecidas
6. testar se o fluxo continua o mesmo apos a migracao

#### Resultado esperado

O app deixa de depender de elevacao de estado para tarefas e passa a usar uma store simples e previsivel.

---

## Ordem de Desenvolvimento Atualizada

1. controlar `Dialog` com `useState` `concluido`
2. transformar `TaskForm` em formulario controlado `concluido`
3. mover `tasks` para estado local no `App.tsx` `concluido`
4. implementar criacao real de tarefa `concluido`
5. fechar `Dialog` apos submit `concluido`
6. fazer `TaskStats` reagir ao estado real `concluido`
7. adicionar primeira interacao no `TaskItem` `concluido`
8. persistir tarefas com `useEffect`
9. melhorar foco e UX do formulario com `useRef`
10. adicionar filtro e busca
11. compartilhar estado de interface com `useContext`
12. extrair hooks customizados e usar `useMemo`
13. migrar para Zustand
14. adicionar tema

---

## O que ainda nao devemos fazer

Por enquanto, evitar:

- criar store Zustand antes do fluxo local existir
- colocar `useContext` para tarefas antes de entender bem o estado local
- colocar filtro e busca antes da lista funcionar com estado real
- adicionar logica de editar tarefa cedo demais
- criar middlewares antes do fluxo basico estar funcionando

---

## Checklist da Proxima Etapa

Antes de sair da fase de estado local, confirmar:

- `Dialog` abre e fecha com estado controlado
- `TaskForm` usa `value` e `onChange`
- nova tarefa aparece na lista
- `TaskStats` reage ao estado real
- remover tarefa funciona
- alternar status funciona
- tarefas persistem com `localStorage`
- o input principal recebe foco ao abrir o modal
- filtro e busca funcionam sem prop drilling desnecessario
- fluxo visual continua limpo
- o `handleSubmit` usa `React.SubmitEvent<HTMLFormElement>`

---

## Meta Final

Ao concluir o `Task Flow`, eu devo conseguir:

- criar estado local com seguranca
- aplicar `useEffect`, `useRef`, `useContext` e `useMemo` em casos reais
- criar store simples com Zustand
- decidir melhor entre `useState` e Zustand
- organizar melhor componentes, hooks e tipos
- explicar o papel de cada parte do projeto
