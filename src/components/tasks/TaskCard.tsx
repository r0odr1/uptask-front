import { Task } from "@/types/index"

type TaskCardProps = {
  task: Task
}

export default function TaskCard({task} : TaskCardProps) {
  console.log(task)
  return (
    <div>TaskCard</div>
  )
}
