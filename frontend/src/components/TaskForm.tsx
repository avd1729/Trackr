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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition min-h-[60px]"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          id="completed"
          className="accent-purple-500"
        />
        <label htmlFor="completed" className="text-gray-700">Completed</label>
      </div>
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">Add Task</button>
    </form>
  );
};

export default TaskForm;
