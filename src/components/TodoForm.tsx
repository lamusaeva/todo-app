import { useForm } from 'react-hook-form'
import { useTodoContext } from '../hooks/useTodoContext'

type FormData = {
  title: string
}

function TodoForm() {
  const { addTodo } = useTodoContext()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    await addTodo(data.title)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-6">
      <div className="flex-1">
        <input
          {...register('title', { required: 'Todo mətni lazımdır' })}
          placeholder="Add new task..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-700 placeholder-gray-400"
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1 ml-1">{errors.title.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-purple-500 text-white font-medium rounded-xl hover:bg-purple-400 transition shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : '+ Add Task'}
      </button>
    </form>
  )
}

export default TodoForm