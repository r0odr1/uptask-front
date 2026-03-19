import { updatePasswordWithToken } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ConfirmToken, NewPasswordForm } from "../../types";

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
  const navigate = useNavigate()
  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })


  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token
    }
    mutate(data)
  }

  const password = useWatch({ control, name: 'password' });

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 bg-white mt-10 rounded-lg"
        noValidate
      >

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border-gray-300 border rounded-lg"
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
            className="font-normal text-2xl"
          >
            Repetir Contraseña
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border-gray-300 border rounded-lg"
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
          value='Establecer Password'
          className="btn-primary w-full p-3 text-white font-black text-xl cursor-pointer transition-all"
        />
      </form>
    </>
  )
}