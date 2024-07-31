import { useForm } from "react-hook-form"
import { useAuth } from "../../contexts/authContext"
import { AuthType } from "../../common/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema } from "../../validations/authSchema."

const Login = () => {
  const { Login } = useAuth()
  const { register, formState: { errors }, handleSubmit } = useForm<AuthType>({ resolver: zodResolver(SignInSchema) })
  const onSubmit = (res: AuthType) => {
    (async () => {
      try {
        await Login(res)

      } catch (error) {
        console.log(error);

      }
    })()
  }
  return (
    <section className="md:max-w-6xl mx-auto">
      <div className="my-5">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="md:max-w-2xl md:mx-auto">
          <h1 className="my-5 text-3xl font-bold text-center">Sign In</h1>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Email">Email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" placeholder="Email" {...register("email", { required: true })} />
            <div className="font-bold text-red-600">{errors.email && <p>{errors.email?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Password">Password</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" placeholder="Password" {...register("password", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.password && <p>{errors.password?.message}</p>}</div>
          </div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Login</button>

        </form>
      </div>
    </section>
  )
}

export default Login
