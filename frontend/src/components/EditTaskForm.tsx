import { useState } from "react";
import type { Task } from "@/model/Task";
import type { TaskDTO } from "@/dto/TaskDTO";

interface EditTaskFormProps {
    task: Task;
    onSave: (updatedTask: TaskDTO) => Promise<Task>;
    onCancel: () => void;
    onDelete: (id: number) => Promise<Task>; 
}

const EditTaskForm = ({ task, onSave, onCancel, onDelete } : EditTaskFormProps) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [category, setCategory] = useState(task.category);
    const [completed, setCompleted] = useState(task.completed);

    const handleSubmit = () => {
        onSave({ title, description, dueDate, category, completed });
    };

    const handleDelete = () => {
        if (task.taskId !== undefined) {
            onDelete(task.taskId);
        } else {
            console.error("Task ID is undefined. Cannot delete task.");
        }
    }

    return (
        <div className="space-y-4">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
            <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className="accent-purple-500" /> Completed
            </label>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition">Cancel</button>
                <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">Save</button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">Delete</button>
            </div>
        </div>
    );

}

export default EditTaskForm;