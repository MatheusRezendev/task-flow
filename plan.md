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
- `TaskForm` criado visualmente
- `TaskList` criada visualmente
- `TaskItem` criado visualmente
- `TaskStats` criada visualmente
- arquitetura principal da tela definida:
  - `TaskStats` no topo
  - `TaskList` como secao principal
  - `TaskItem` renderizado dentro de `TaskList`
  - `TaskForm` sera aberto por `Dialog` dentro de `TaskList`

### Parcial

- `TaskStats` ainda precisa ser alimentado por dados reais da tela
- `TaskList` ainda nao recebe `tasks` por props
- `TaskList` ainda nao renderiza `TaskItem`
- `TaskList` ainda nao abre `Dialog`
- `TaskForm` ainda e apenas visual
- mocks ainda estao sendo organizados para alimentar a tela

### Ainda nao iniciado

- fluxo com `useState`
- criacao real de tarefas
- renderizacao real da lista
- `Dialog` para abrir o `TaskForm`
- filtros
- busca
- Zustand

---

## Estrutura de Tela Definida

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
- deve ficar no topo
- recebe dados por props

#### `TaskList`

- e a secao principal da lista
- mostra titulo, descricao e contador
- mostra botao `New Task`
- deve abrir o `Dialog`
- renderiza os `TaskItem`
- mostra estado vazio quando nao houver tarefas

#### `TaskItem`

- representa uma tarefa individual
- mostra titulo, descricao, status e data
- por enquanto e apenas visual

#### `TaskForm`

- aparece dentro de `Dialog`
- e responsavel apenas pelos campos e envio do formulario
- por enquanto e apenas visual

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
    ThemeToggle.tsx

  hooks/
    use-task-filter.ts
    use-task-search.ts

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

Esses sao os proximos passos levando em conta o que ja foi construido.

### Passo 1 - Criar mocks isolados em `src/lib`

#### Meta

Parar de criar dados fake diretamente nos componentes.

#### O que fazer

1. criar `src/lib/mockTasks.ts`
2. exportar `MOCK_TASKS` tipado com `Task[]`
3. usar esses mocks no `App.tsx`
4. derivar stats a partir desses dados mockados

#### Estrutura base

```ts
import type { Task } from "@/types/task"

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Study Zustand",
    description: "Practice global state and stores.",
    completed: false,
    createdAt: new Date(),
  },
]
```

#### Aprendizado

- separar dados fake da tela
- deixar `App.tsx` mais limpo
- preparar o projeto para trocar mocks por estado real depois

---

### Passo 2 - Usar mocks no `App.tsx`

#### Meta

Deixar o `App.tsx` mais proximo da arquitetura final.

#### O que fazer

1. importar `MOCK_TASKS` de `src/lib/mockTasks.ts`
2. deixar o `App.tsx` com foco em:
   - `TaskStats`
   - `TaskList`
3. calcular `total`, `completed` e `pending` a partir de `MOCK_TASKS`
4. passar `tasks` por props para `TaskList`

#### Estrutura base

```tsx
import { MOCK_TASKS } from "@/lib/mockTasks"
```

```tsx
const total = MOCK_TASKS.length
const completed = MOCK_TASKS.filter((task) => task.completed).length
const pending = MOCK_TASKS.filter((task) => !task.completed).length
```

```tsx
export default function App() {
  return (
    <main>
      <TaskStats total={total} completed={completed} pending={pending} />
      <TaskList tasks={MOCK_TASKS} />
    </main>
  )
}
```

---

### Passo 3 - Ajustar `TaskStats`

#### Meta

Fazer o `TaskStats` refletir dados vindos por props.

#### O que fazer

1. manter `TaskStatsProps = TaskStats`
2. garantir que os cards reflitam os dados recebidos
3. manter a organizacao visual em grid

#### Estrutura base

```tsx
type TaskStatsProps = TaskStats

export function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return <section>{/* cards de resumo */}</section>
}
```

---

### Passo 4 - Ajustar o `TaskList` para o papel correto

#### Meta

Fazer `TaskList` deixar de ser um card isolado e virar secao principal da lista.

#### O que fazer

1. receber `tasks` por props
2. renderizar contador com base em `tasks.length`
3. manter estado vazio
4. preparar area de renderizacao dos itens

#### Estrutura base

```tsx
import type { Task } from "@/types/task"

type TaskListProps = {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <section>
      <div>{/* titulo + contador + botao */}</div>
      <div>{/* estado vazio ou lista */}</div>
    </section>
  )
}
```

---

### Passo 5 - Renderizar `TaskItem` dentro de `TaskList`

#### Meta

Fazer a lista usar o componente certo.

#### O que fazer

1. importar `TaskItem` dentro de `TaskList`
2. usar `map`
3. quando nao houver tarefas, mostrar o card de estado vazio

#### Estrutura base

```tsx
{tasks.length === 0 ? (
  <Card>{/* empty state */}</Card>
) : (
  <div>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} />
    ))}
  </div>
)}
```

---

### Passo 6 - Colocar o botao `New Task` dentro de `TaskList`

#### Meta

Fazer o `TaskList` ser o ponto de entrada para criacao de tarefa.

#### O que fazer

1. adicionar botao no header da lista
2. por enquanto ele pode ser apenas visual
3. depois ele vira `DialogTrigger`

#### Estrutura base

```tsx
<div>
  <h2>My Tasks</h2>
  <Button>New Task</Button>
</div>
```

---

### Passo 7 - Abrir `TaskForm` dentro de `Dialog`

#### Meta

Conectar o fluxo de criacao sem ainda implementar a logica final.

#### O que fazer

1. adicionar `Dialog`
2. usar `DialogTrigger asChild`
3. renderizar `TaskForm` em `DialogContent`

#### Estrutura base

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

---

## Ordem de Desenvolvimento Atualizada

1. criar `mockTasks.ts` em `src/lib`
2. usar mocks no `App.tsx`
3. ajustar `TaskStats`
4. fazer `TaskList` receber `tasks`
5. renderizar `TaskItem` dentro de `TaskList`
6. adicionar botao `New Task` no `TaskList`
7. abrir `TaskForm` em `Dialog`
8. implementar fluxo com `useState`
9. adicionar filtro e busca
10. extrair hooks customizados
11. migrar para Zustand
12. adicionar persistencia
13. adicionar tema

---

## Etapa Seguinte - Estado Local

Depois que a estrutura visual estiver encaixada, a proxima etapa sera fazer tudo funcionar com `useState`.

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

---

## O que ainda nao devemos fazer

Por enquanto, evitar:

- criar store Zustand antes do fluxo local existir
- colocar filtro e busca antes da lista funcionar
- adicionar logica de editar tarefa cedo demais
- criar middlewares antes do fluxo basico estar funcionando

---

## Checklist do Momento Atual

Antes de sair da fase visual, confirmar:

- `MOCK_TASKS` existe em `src/lib`
- `TaskStats` mostra dados por props
- `TaskList` recebe `tasks`
- `TaskItem` aparece dentro da lista
- `TaskForm` abre via `Dialog`
- `App.tsx` nao esta mais usando dados fake espalhados nem componentes soltos de teste

---

## Meta Final

Ao concluir o `Task Flow`, eu devo conseguir:

- criar estado local com seguranca
- criar store simples com Zustand
- decidir melhor entre `useState` e Zustand
- organizar melhor componentes, hooks e tipos
- explicar o papel de cada parte do projeto
