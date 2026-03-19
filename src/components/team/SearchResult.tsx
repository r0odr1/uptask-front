import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

export default function SearchResult({user, reset} : SearchResultProps) {

  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id
    }

    mutate(data)
  }

  return (
    <>
      <p className="mt-10 text-center font-bold text-white mb-6">Resultado:</p>
      <div className="bg-neutral-700 rounded-xl p-6 shadow-lg border border-neutral-600">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-neutral-400">Nombre</p>
            <p className="text-lg font-semibold text-white">{user.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-neutral-400">Correo</p>
            <p className="text-lg font-semibold text-white truncate">{user.email}</p>
          </div>

          <button
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md mt-4 sm:mt-0 whitespace-nowrap"
            onClick={handleAddUserToProject}
          >
            Agregar al proyecto
          </button>
        </div>
      </div>
    </>
  )
}
