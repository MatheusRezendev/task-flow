# Task Flow - Roadmap de Estudo

## Objetivo

Construir um app de tarefas para praticar:

- fundamentos de React
- hooks mais usados
- separacao de responsabilidades
- estado local
- estado global com Zustand
- organizacao de projeto inspirada no `vite-project`

Este arquivo serve como guia de execucao.
O ideal e seguir em ordem, etapa por etapa.

---

## Regra do Projeto

Antes de colocar qualquer coisa no Zustand, responder:

1. Esse dado precisa ser compartilhado entre varios componentes?
2. Esse dado precisa sobreviver fora do componente atual?
3. Esse dado realmente e estado ou pode ser calculado?

Se a resposta for "nao" para quase tudo, usar `useState`.

---

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand

---

## Comandos Base

Executar dentro de `zustand/task-flow`.

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

### Instalar Zustand

```bash
npm install zustand
```

### Instalar icones

```bash
npm install lucide-react
```

### Inicializar shadcn

```bash
npx shadcn@latest init
```

### Adicionar componentes shadcn mais provaveis

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add checkbox
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add dialog
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
    ThemeToggle.tsx

  hooks/
    use-task-filter.ts
    use-task-search.ts

  store/
    task-store.ts
    theme-store.ts

  types/
    task.ts

  lib/
    utils.ts

  App.tsx
  main.tsx
  index.css
```

---

## Estrutura de Tela

Esta sera a estrutura principal da tela:

```txt
App
  TaskStats
  TaskList
    header da lista
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

- fica no topo da tela principal
- mostra resumo rapido das tarefas
- recebe dados por props

#### `TaskList`

- e a secao principal da lista
- mostra titulo, descricao e contador
- mostra o botao `New Task`
- controla a abertura do `Dialog`
- renderiza os `TaskItem`
- mostra estado vazio quando nao houver tarefas

#### `TaskItem`

- representa uma tarefa individual
- mostra titulo, descricao, status e data
- futuramente recebe acoes como concluir, editar e remover

#### `TaskForm`

- nao fica exposto direto na tela principal
- aparece dentro de um `Dialog`
- e responsavel apenas pelos campos e envio do formulario

---

## Ordem de Desenvolvimento

## Etapa 1 - Preparar a Base

### Meta

Deixar o projeto pronto para comecar a praticar.

### Fazer

1. Confirmar que o app roda
2. Confirmar Tailwind funcionando
3. Confirmar shadcn funcionando
4. Limpar o `App.tsx`
5. Ajustar o `index.css` com a base visual do projeto

### Resultado esperado

Uma tela limpa, com tema e estrutura pronta para montar o app.

---

## Etapa 2 - Modelar os Dados

### Meta

Definir o formato da tarefa antes de criar componentes.

### Arquivo alvo

`src/types/task.ts`

### Estrutura sugerida

```ts
export type Task = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}
```

### Aprendizado

- tipagem basica
- pensar no formato do estado antes da interface

---

## Etapa 3 - Criar a Interface Base

### Meta

Montar os blocos visuais do app sem logica complexa ainda.

### Ordem visual no `App.tsx`

1. `TaskStats`
2. `TaskList`

### Estrutura base

```tsx
export default function App() {
  return (
    <main>
      <TaskStats />
      <TaskList />
    </main>
  )
}
```

---

## Etapa 3.1 - Montar o `TaskStats`

### Meta

Criar o bloco superior de resumo da aplicacao.

### O que ele deve mostrar

- total de tarefas
- tarefas concluidas
- tarefas pendentes

### Estrutura base

```tsx
type Props = {
  total: number
  completed: number
  pending: number
}

export function TaskStats({ total, completed, pending }: Props) {
  return <section>{/* cards de resumo */}</section>
}
```

---

## Etapa 3.2 - Montar o `TaskList`

### Meta

Transformar o `TaskList` em secao principal da tela.

### O que ele deve ter

- titulo da secao
- descricao curta
- contador de tarefas
- botao `New Task`
- estado vazio
- area onde os `TaskItem` serao renderizados

### Estrutura base

```tsx
type Props = {
  tasks: Task[]
}

export function TaskList({ tasks }: Props) {
  return (
    <section>
      <div>{/* titulo + contador + botao */}</div>
      <div>{/* estado vazio ou lista */}</div>
    </section>
  )
}
```

---

## Etapa 3.3 - Abrir `TaskForm` via `Dialog`

### Meta

Usar o `TaskList` como ponto de entrada para criar novas tarefas.

### Componentes shadcn necessarios

- `Dialog`
- `DialogTrigger`
- `DialogContent`

### Estrutura base

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>New Task</Button>
  </DialogTrigger>

  <DialogContent>
    <TaskForm />
  </DialogContent>
</Dialog>
```

### Aprendizado

- composicao de componentes
- diferenca entre secao principal e conteudo modal
- responsabilidade do `TaskList`

---

## Etapa 3.4 - Montar o `TaskItem`

### Meta

Criar o card visual de cada tarefa.

### O que ele deve mostrar

- titulo
- descricao
- status
- data

### Estrutura base

```tsx
type Props = {
  task: Task
}

export function TaskItem({ task }: Props) {
  return (
    <Card>
      {/* header */}
      {/* content */}
      {/* footer */}
    </Card>
  )
}
```

### Observacao

Nesta etapa o `TaskItem` ainda e visual.
As acoes de concluir, editar e remover podem vir depois.

---

## Etapa 3.5 - Montar o `TaskForm`

### Meta

Criar o formulario visual que sera aberto no `Dialog`.

### O que ele deve ter

- campo de titulo
- campo de descricao
- botao de submit

### Estrutura base

```tsx
export function TaskForm() {
  return <form>{/* input + descricao + submit */}</form>
}
```

---

## Etapa 4 - Comecar com Estado Local

### Meta

Fazer a aplicacao funcionar com `useState` antes de usar Zustand.

### Por que fazer isso

Se a logica nao estiver clara com React puro, ela tambem nao vai ficar clara com Zustand.

### Estruturas base

```tsx
const [tasks, setTasks] = useState<Task[]>([])
```

```tsx
const [title, setTitle] = useState("")
```

```tsx
const [description, setDescription] = useState("")
```

```tsx
const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
```

```tsx
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}
```

```tsx
const handleToggleTask = (taskId: string) => {}
```

```tsx
const handleRemoveTask = (taskId: string) => {}
```

### Aprendizado

- `useState`
- formularios controlados
- arrays no estado
- atualizacao imutavel
- estado local de modal/dialog

---

## Etapa 5 - Adicionar Filtro e Busca Local

### Meta

Praticar estado local complementar e valores derivados.

### Estados provaveis

```tsx
const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
```

```tsx
const [search, setSearch] = useState("")
```

### Valores derivados

```tsx
const filteredTasks = tasks.filter((task) => {
  return true
})
```

```tsx
const completedCount = tasks.filter((task) => task.completed).length
```

```tsx
const pendingCount = tasks.filter((task) => !task.completed).length
```

### Aprendizado

- nem tudo precisa virar estado
- diferenca entre estado e dado derivado

---

## Etapa 6 - Extrair Hooks Customizados

### Meta

Separar logica reaproveitavel da interface.

### Arquivos alvo

- `hooks/use-task-filter.ts`
- `hooks/use-task-search.ts`

### Estruturas base

```ts
export function useTaskFilter(tasks: Task[], filter: "all" | "active" | "completed") {
  return tasks
}
```

```ts
export function useTaskSearch(tasks: Task[], search: string) {
  return tasks
}
```

### Aprendizado

- quando criar hook customizado
- como remover logica do componente sem perder clareza

---

## Etapa 7 - Introduzir Zustand

### Meta

Mover a lista de tarefas para estado global.

### O que vai para o Zustand

- `tasks`
- `addTask`
- `removeTask`
- `toggleTask`
- `clearCompleted`

### O que nao vai para o Zustand por enquanto

- valor do input
- busca digitada
- filtro visual temporario
- controle local do `Dialog`

### Arquivo alvo

`src/store/task-store.ts`

### Estrutura base da store

```ts
type TaskState = {
  tasks: Task[]
}
```

```ts
type TaskActions = {
  addTask: (title: string, description: string) => void
  removeTask: (taskId: string) => void
  toggleTask: (taskId: string) => void
  clearCompleted: () => void
}
```

```ts
type TaskStore = TaskState & TaskActions
```

```ts
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title, description) => {},
  removeTask: (taskId) => {},
  toggleTask: (taskId) => {},
  clearCompleted: () => {},
}))
```

### Leitura no componente

```tsx
const tasks = useTaskStore((state) => state.tasks)
```

```tsx
const addTask = useTaskStore((state) => state.addTask)
```

### Aprendizado

- o que e uma store
- estado global compartilhado
- actions do Zustand

---

## Etapa 8 - Persistencia com Middleware

### Meta

Salvar tarefas no navegador para nao perder ao recarregar a pagina.

### Estrutura base

```ts
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, description) => {},
      removeTask: (taskId) => {},
      toggleTask: (taskId) => {},
      clearCompleted: () => {},
    }),
    {
      name: "task-flow-storage",
    }
  )
)
```

### Aprendizado

- middleware no Zustand
- persistencia simples

---

## Etapa 9 - Tema com Store Separada

### Meta

Criar um segundo exemplo simples de estado global.

### Arquivo alvo

`src/store/theme-store.ts`

### Estrutura base

```ts
type Theme = "light" | "dark"
```

```ts
type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
}
```

```ts
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",
  toggleTheme: () => {},
}))
```

### Aprendizado

- stores pequenas e focadas
- separar dominio de tarefa e dominio de tema

---

## Etapa 10 - Melhorar os Componentes com Base no vite-project

### Meta

Usar o `vite-project` como referencia de organizacao, nao como copia cega.

### Observar no `vite-project`

- separacao entre `components`, `store`, `types`
- uso de hooks para ler estado
- responsabilidade de cada arquivo
- padrao visual dos cards e blocos

### Nao copiar sem pensar

- complexidade de slices cedo demais
- middlewares avancados sem necessidade
- estados duplicados

---

## Ordem Recomendada de Implementacao

1. preparar base do app
2. modelar tipo `Task`
3. montar `TaskStats`
4. montar `TaskList`
5. montar `TaskItem`
6. abrir `TaskForm` via `Dialog`
7. implementar com `useState`
8. adicionar filtro e busca
9. extrair hooks customizados
10. migrar tarefas para Zustand
11. adicionar persistencia
12. adicionar tema
13. revisar organizacao final

---

## Checklist por Etapa

Antes de seguir para a proxima etapa, confirmar:

- entendi por que esse estado existe
- sei quem le esse estado
- sei quem altera esse estado
- sei por que ele e local ou global
- consigo explicar a escolha do hook

---

## Estruturas Minimas de Funcoes

### Adicionar tarefa

```ts
const addTask = (title: string, description: string) => {}
```

### Remover tarefa

```ts
const removeTask = (taskId: string) => {}
```

### Alternar concluido

```ts
const toggleTask = (taskId: string) => {}
```

### Limpar concluidas

```ts
const clearCompleted = () => {}
```

### Buscar tarefas

```ts
const handleSearchChange = (value: string) => {}
```

### Trocar filtro

```ts
const handleFilterChange = (filter: "all" | "active" | "completed") => {}
```

### Abrir e fechar dialog

```ts
const handleOpenChange = (open: boolean) => {}
```

### Alternar tema

```ts
const toggleTheme = () => {}
```

---

## Meta Final

Ao concluir o `Task Flow`, eu devo conseguir:

- criar estado local com seguranca
- criar store simples com Zustand
- decidir melhor entre `useState` e Zustand
- organizar melhor componentes, hooks e tipos
- explicar o papel de cada parte do projeto
