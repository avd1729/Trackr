import { useState } from "react";
import type { TaskDTO } from "@/dto/TaskDTO";
import type { Task } from "@/model/Task";

interface TaskFormProps {
  onTaskCreated: (taskDTO: TaskDTO) => Promise<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: TaskDTO = {
      title,
      description,
      dueDate,
      category,
      completed,
    };

    try {
      const createdTask = await onTaskCreated(newTask);
      console.log("Created task:", createdTask);
    } catch (error) {
      console.error("Failed to create task:", error);
    }

    // reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
