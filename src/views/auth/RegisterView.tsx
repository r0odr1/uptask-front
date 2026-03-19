import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = useWatch({ control, name: 'password' });

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white/80 mt-5">
        Llena el formulario para {''}
        <span className="text-gradient-primary font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="glass-panel space-y-8 p-10 mt-10"
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
              required: "El E-mail de registro es obligatorio",
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-white"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="input-modern w-full p-3"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-white"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña de Registro"
            className="input-modern w-full p-3"
            {...register("password", {
              required: "La Contraseña es obligatoria",
              minLength: {
                value: 8,
                message: 'La Contraseña debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-white"
          >Repetir Contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Contraseña de Registro"
            className="input-modern w-full p-3"
            {...register("password_confirmation", {
              required: "Repetir la Contraseña es obligatorio",
              validate: value => value === password || 'Las Contraseñas ingresadas no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="btn-primary w-full p-3 text-white font-black text-xl cursor-pointer transition-all"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/login'}
          className="text-center text-gray-300 hover:text-white font-normal"
        >
          ¿Ya tienes una cuenta? Iniciar Sesión
        </Link>

        <Link
          to={'/auth/forgot-password'}
          className="text-center hover:text-white text-gray-300 font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}