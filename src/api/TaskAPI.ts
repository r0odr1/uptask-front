import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";

type TaskAPI = {
  formData: TaskFormData
  projectId: Project['_id']
  taskId: Task['_id']
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

export async function getTaskById({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api(url)
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