import React, { useEffect, useState} from "react";
import TaskForm from "./components/TaskForm";
import { createTask, getAllTasks } from "./api/api";
import type { TaskDTO } from "./dto/TaskDTO";
import type { Task } from "./model/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskDTO: TaskDTO): Promise<Task> => {
    const newTask = await createTask(taskDTO);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My Todo App</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />

      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <strong>{task.title}</strong> - {task.description} ({task.category}) due {task.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
