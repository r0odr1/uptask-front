import { forgotPassword } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgotPasswordForm } from "../../types";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
      <p className="text-2xl font-light text-white/80 mt-5">
        ¿Olvidaste tu contraseña? Coloca tu correo {''}
        <span className="text-gradient-primary font-bold"> y reestablece tu contraseña</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="glass-panel space-y-8 p-10 mt-8"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-white"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="input-modern w-full p-3"
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
          value='Enviar Instrucciones'
          className="btn-primary w-full p-3 text-white font-black text-xl cursor-pointer transition-all"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-300 font-normal hover:text-white"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-300 font-normal hover:text-white"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}