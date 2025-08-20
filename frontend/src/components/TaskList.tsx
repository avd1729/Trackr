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
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div
          key={task.taskId}
          onClick={() => handleEdit(task)}
          className="cursor-pointer bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 shadow transition flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <span className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-purple-800'}`}>{task.title}</span>
            <span className={`text-xs px-2 py-1 rounded ${task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-700'}`}>{task.completed ? 'Completed' : 'Pending'}</span>
          </div>
          <div className="text-gray-700 text-sm">{task.description}</div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Category: <span className="font-medium text-purple-600">{task.category}</span></span>
            <span>Due: {task.dueDate}</span>
          </div>
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
