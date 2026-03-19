import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/api/AuthAPI';
import { toast } from 'react-toastify';
import { deleteProject } from '@/api/ProjectAPI';

export default function DeleteProjectModal() {
const initialValues : CheckPasswordForm = {
  password: ''
}
const location = useLocation()
const navigate = useNavigate()

const queryParams = new URLSearchParams(location.search);
const deleteProjectId = queryParams.get('deleteProject')!;
const show = deleteProjectId ? true : false

const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

const queryClient = useQueryClient()

const checkUserPasswordMutation = useMutation({
  mutationFn: checkPassword,
  onError: (error) => toast.error(error.message)
})


const deleteProjectMutation = useMutation({
  mutationFn: deleteProject,
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: (data) => {
    toast.success(data)
    queryClient.invalidateQueries({queryKey: ['projects']})
    navigate(location.pathname, { replace: true })
  }
})

const handleForm = async (formData : CheckPasswordForm) => {
  await checkUserPasswordMutation.mutateAsync(formData)
  await deleteProjectMutation.mutateAsync(deleteProjectId)
}

return (
  <Transition appear show={show} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/60" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="glass-panel w-full max-w-2xl transform overflow-hidden text-left align-middle shadow-2xl transition-all p-10 rounded-2xl border border-white/20">

              <Dialog.Title
                as="h3"
                className="font-black text-4xl text-gradient-primary mb-2"
              >
                Eliminar Proyecto
              </Dialog.Title>

              <p className="text-lg font-semibold text-white/90 mb-8">Confirma la eliminación del proyecto {''}
                <span className="text-brandAccent-400 font-bold"> colocando tu contraseña</span>
              </p>

              <form
                className="space-y-6"
                onSubmit={handleSubmit(handleForm)}
                noValidate
              >

                <div className="flex flex-col gap-3">
                  <label
                      className="font-semibold text-lg text-white"
                      htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Contraseña Inicio de Sesión"
                    className="input-modern w-full p-3 text-base"
                    {...register("password", {
                        required: "La Contraseña es obligatoria",
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                </div>

                <input
                    type="submit"
                    className="btn-primary w-full p-4 text-white font-black text-lg cursor-pointer transition-all hover:scale-105"
                    value='Eliminar Proyecto'
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
}