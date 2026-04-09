// TodoList.tsx
import { useTodoContext } from '../hooks/useTodoContext'
import TodoItem from './TodoItem'

function TodoList() {
  const { todos } = useTodoContext()

  if (todos.length === 0) return (
    <p className="text-center text-gray-400 py-8">No tasks yet. Add one above!</p>
  )

  return (
    <ul className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList