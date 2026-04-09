import { useForm } from "react-hook-form"
import { supabase } from "../lib/supabase"

type FormData = {
  email: string
  password: string
}

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })
      if (error) throw error
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 w-full max-w-md">
        
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Welcome back</h1>
        <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
            <input
              {...register('email', { required: 'Email lazımdır' })}
              placeholder="you@example.com"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-700 placeholder-gray-400"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
            <input
              {...register('password', { required: 'Şifrə lazımdır' })}
              placeholder="••••••••"
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-700 placeholder-gray-400"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-500 text-white font-medium rounded-xl hover:bg-purple-400 transition shadow-sm disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login