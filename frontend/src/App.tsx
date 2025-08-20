import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { createTask, getAllTasks } from "./api/api";
import type { TaskDTO } from "@/dto/TaskDTO";
import type { Task } from "@/model/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskDTO: TaskDTO): Promise<Task> => {
    const newTask = await createTask(taskDTO);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-2">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 drop-shadow-lg tracking-tight">Trackr</h1>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      </div>
    </div>
  );
};

export default App;
