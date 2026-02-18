import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TaskFormData } from "../types";

type TaskAPI = {
  formData: TaskFormData
  projectId: Project['_id']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {

  try {
    const url = `/projects/${projectId}/tasks`
    const { data } = await api.post<string>(url, formData)
    return data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// export async function getTasks() {

//   try {
//     const { data } = await api('/projects')
//     const response = dashboardProjectSchema.safeParse(data)

//     if(response.success) {
//       return response.data
//     }


//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }

// export async function getProjectById(id: Project['_id']) {

//   try {
//     const { data } = await api(`/projects/${id}`)
//     return data

//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }

// export async function updateProject({formData, projectId} : ProjectAPIType) {

//   try {
//     const { data } = await api.put<string>(`/projects/${projectId}`, formData)
//     return data

//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }

// export async function deleteProject(id: Project['_id']) {

//   try {
//     const { data } = await api.delete<string>(`/projects/${id}`)
//     return data

//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }