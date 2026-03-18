import { authenticateUser } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']})
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-base sm:text-lg lg:text-2xl font-light text-white mt-5">
        Comienza a plenear tus prouectos {''}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6 sm:space-y-8 p-6 sm:p-10 mt-3 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-3 sm:gap-5">
          <label
            className="font-normal text-lg sm:text-xl lg:text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-2 sm:p-3 border-gray-300 border rounded-lg text-sm sm:text-base"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:gap-5">
          <label
            className="font-normal text-lg sm:text-xl lg:text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-2 sm:p-3 border-gray-300 border rounded-lg text-sm sm:text-base"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 sm:p-3 text-white font-black text-base sm:text-lg lg:text-xl cursor-pointer rounded-lg"
        />
      </form>

      <nav className="mt-8 sm:mt-10 flex flex-col space-y-3 sm:space-y-4">
        <Link
          to={'/auth/register'}
          className="text-center text-gray-300 font-normal text-sm sm:text-base"
        >
          ¿No tienes una cuenta? Crear Una
        </Link>

        <Link
          to={'/auth/forgot-password'}
          className="text-center text-gray-300 font-normal text-sm sm:text-base"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}