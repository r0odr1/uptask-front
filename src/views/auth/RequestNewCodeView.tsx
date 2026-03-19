import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
      email: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error)=> {
      toast.error(error.message)
    },
    onSuccess: (data)=> {
      toast.success(data)
      reset()
    }
  })

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Solicitar Código de Confirmación</h1>
      <p className="text-2xl font-light text-white mt-5">
        Coloca tu e-mail para recibir {''}
        <span className="text-gradient-primary font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="glass-panel space-y-8 p-10 mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
              className="font-normal text-2xl text-white"
              htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("email", {
                required: "El Email de registro es obligatorio",
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

        <input
          type="submit"
          value='Enviar Código'
          className="btn-primary w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer transition-all"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-white/70 hover:text-white font-normal text-sm sm:text-base transition-colors"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to='/auth/forgot-password'
          className="text-center text-white/70 hover:text-white font-normal text-sm sm:text-base transition-colors"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}