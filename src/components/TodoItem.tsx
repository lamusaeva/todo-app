import { useTodoContext } from '../hooks/useTodoContext'
import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, toggleTodo } = useTodoContext()

  return (
    <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group">
      <button
        onClick={() => toggleTodo(todo.id, todo.completed)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
          todo.completed
            ? 'bg-purple-500 border-purple-500'
            : 'border-gray-300 hover:border-purple-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
        {todo.title}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem