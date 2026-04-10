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
- `App.tsx` ja consome `MOCK_TASKS`
- `TaskStats` recebe props reais
- `TaskList` recebe `tasks` por props
- `TaskItem` ja renderiza dentro de `TaskList`
- botao `New Task` ja existe em `TaskList`
- `TaskForm` ja abre via `Dialog`

### Parcial

- `TaskForm` ainda e apenas visual
- `Dialog` ainda nao esta controlado por estado local
- a criacao de tarefas ainda nao acontece de verdade
- `TaskStats` ainda depende de dados mockados
- `TaskList` ainda nao alterna entre estado vazio e estado real via estado local

### Ainda nao iniciado

- fluxo com `useState`
- criacao real de tarefas
- controle real do `Dialog`
- toggle de tarefa concluida
- remocao de tarefa
- filtros
- busca
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
- abre o `Dialog`
- renderiza os `TaskItem`
- mostra estado vazio quando nao houver tarefas

#### `TaskItem`

- representa uma tarefa individual
- mostra titulo, descricao, status e data
- por enquanto e apenas visual

#### `TaskForm`

- aparece dentro de `Dialog`
- e responsavel pelos campos e envio do formulario
- por enquanto ainda nao controla estado

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

Agora que a estrutura visual base ja foi montada, o foco muda para estado local.

### Passo 1 - Controlar o `Dialog` com `useState`

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

### Passo 2 - Transformar `TaskForm` em formulario controlado

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

### Passo 3 - Criar tarefas de verdade com `useState`

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

### Passo 4 - Fechar o `Dialog` apos criar tarefa

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

### Passo 5 - Fazer `TaskStats` reagir ao estado real

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

### Passo 6 - Adicionar a primeira interacao do `TaskItem`

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

## Ordem de Desenvolvimento Atualizada

1. controlar `Dialog` com `useState`
2. transformar `TaskForm` em formulario controlado
3. mover `tasks` para estado local no `App.tsx`
4. implementar criacao real de tarefa
5. fechar `Dialog` apos submit
6. fazer `TaskStats` reagir ao estado real
7. adicionar primeira interacao no `TaskItem`
8. adicionar filtro e busca
9. extrair hooks customizados
10. migrar para Zustand
11. adicionar persistencia
12. adicionar tema

---

## O que ainda nao devemos fazer

Por enquanto, evitar:

- criar store Zustand antes do fluxo local existir
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
- fluxo visual continua limpo
- o `handleSubmit` usa `React.SubmitEvent<HTMLFormElement>`

---

## Meta Final

Ao concluir o `Task Flow`, eu devo conseguir:

- criar estado local com seguranca
- criar store simples com Zustand
- decidir melhor entre `useState` e Zustand
- organizar melhor componentes, hooks e tipos
- explicar o papel de cada parte do projeto
