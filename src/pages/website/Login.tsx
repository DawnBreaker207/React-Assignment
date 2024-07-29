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
            <label className="form-label" htmlFor="Email">Email</label>
            <input className="form-control" type="email" placeholder="Email" {...register("email", { required: true })} />
            <div className="font-bold text-red-600">{errors.email && <p>{errors.email?.message}</p>}</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="Password">Password</label>
            <input className="form-control" type="password" placeholder="Password" {...register("password", { required: true, minLength: 5 })} />
            <div className="font-bold text-red-600">{errors.password && <p>{errors.password?.message}</p>}</div>
          </div>
          <button className="btn btn-primary" type="submit">Login</button>

        </form>
      </div>
    </section>
  )
}

export default Login
