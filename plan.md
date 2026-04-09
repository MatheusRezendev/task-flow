# Task Flow — Roadmap de Estudo

## Objetivo

Construir um app de tarefas para praticar:

- fundamentos de React
- hooks mais usados
- separacao de responsabilidades
- estado local
- estado global com Zustand
- organizacao de projeto inspirada no `vite-project`

Este arquivo deve servir como guia de execucao.

Nao e para copiar tudo de uma vez.
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
```

---

## Estrutura Alvo

```txt
src/
  components/
    task-form.tsx
    task-list.tsx
    task-item.tsx
    task-filters.tsx
    task-search.tsx
    task-stats.tsx
    theme-toggle.tsx

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

## Ordem de Desenvolvimento

## Etapa 1 — Preparar a Base

### Meta

Deixar o projeto pronto para comecar a praticar.

### Fazer

1. Confirmar que o app roda
2. Confirmar Tailwind funcionando
3. Confirmar shadcn funcionando
4. Limpar o `App.tsx`
5. Deixar o `index.css` com a base visual minima

### Resultado esperado

Uma tela vazia, limpa e pronta para montar o app.

---

## Etapa 2 — Modelar os Dados

### Meta

Definir o formato da tarefa antes de criar componentes.

### Arquivo alvo

`src/types/task.ts`

### Estrutura sugerida

```ts
export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: string
}
```

### Aprendizado

- tipagem basica
- pensar no formato do estado antes da interface

---

## Etapa 3 — Criar a Interface Base

### Meta

Montar os blocos visuais do app sem logica complexa ainda.

### Componentes desta etapa

- `TaskForm`
- `TaskList`
- `TaskItem`
- `TaskStats`

### Estrutura esperada

```tsx
export function TaskForm() {
  return <form>{/* input + button */}</form>
}
```

```tsx
export function TaskList() {
  return <section>{/* lista de tarefas */}</section>
}
```

```tsx
export function TaskItem() {
  return <article>{/* tarefa individual */}</article>
}
```

### Aprendizado

- quebrar interface em componentes
- entender responsabilidade de cada componente

---

## Etapa 4 — Comecar com Estado Local

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

---

## Etapa 5 — Adicionar Filtro e Busca Local

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

## Etapa 6 — Extrair Hooks Customizados

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

## Etapa 7 — Introduzir Zustand

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
  addTask: (title: string) => void
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
  addTask: (title) => {},
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

## Etapa 8 — Persistencia com Middleware

### Meta

Salvar tarefas no navegador para nao perder ao recarregar a pagina.

### Estrutura base

```ts
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) => {},
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

## Etapa 9 — Tema com Store Separada

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
  theme: "light",
  toggleTheme: () => {},
}))
```

### Aprendizado

- stores pequenas e focadas
- separar dominio de tarefa e dominio de tema

---

## Etapa 10 — Melhorar os Componentes com Base no vite-project

### Meta

Usar o `vite-project` como referencia de organizacao, nao como copia cega.

### Observar no `vite-project`

- separacao entre `components`, `store`, `types`
- uso de hooks para ler estado
- responsabilidade de cada arquivo

### Nao copiar sem pensar

- complexidade de slices cedo demais
- middlewares avancados sem necessidade
- estados duplicados

---

## Ordem Recomendada de Implementacao

1. preparar base do app
2. modelar tipo `Task`
3. criar layout base
4. implementar com `useState`
5. adicionar filtro e busca
6. extrair hooks customizados
7. migrar tarefas para Zustand
8. adicionar persistencia
9. adicionar tema
10. revisar organizacao final

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
const addTask = (title: string) => {}
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
