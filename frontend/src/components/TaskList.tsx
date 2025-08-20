import React, { useState } from "react";
import { deleteTask, updateTask } from "../api/api";
import Modal from "./Modal";
import EditTaskForm from "./EditTaskForm";
import type { TaskDTO } from "@/dto/TaskDTO";
import type { Task } from "@/model/Task";

interface TaskListProps {
  tasks: Array<Task>;
  refreshTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refreshTasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedTask: TaskDTO) : Promise<Task> => {
    if (!selectedTask) {
      throw new Error("No task selected for saving.");
    }
    const task: Task = await updateTask(updatedTask, selectedTask.taskId!);
    setIsModalOpen(false);
    setSelectedTask(null);
    refreshTasks();
    return task;
  };

  const handleDelete = async (id: number) : Promise<Task> => {
    if (!selectedTask) {
      throw new Error("No task selected for deleting.");
    }
    const task: Task = await deleteTask(id);
    setIsModalOpen(false);
    setSelectedTask(null);
    refreshTasks();
    return task;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.taskId} onClick={() => handleEdit(task)} style={{ cursor: "pointer", marginBottom: "0.5rem" }}>
          <strong>{task.title}</strong> - {task.description} ({task.category}) due {task.dueDate}
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedTask && (
          <EditTaskForm task={selectedTask} onSave={handleSave} onCancel={() => setIsModalOpen(false)} onDelete={handleDelete}/>
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
