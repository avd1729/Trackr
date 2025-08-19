import { useState } from "react";
import type { Task } from "@/model/Task";
import type { TaskDTO } from "@/dto/TaskDTO";

interface EditTaskFormProps {
    task: Task;
    onSave: (updatedTask: TaskDTO) => Promise<Task>;
    onCancel: () => void;
}

const EditTaskForm = ({ task, onSave, onCancel} : EditTaskFormProps) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [category, setCategory] = useState(task.category);
    const [completed, setCompleted] = useState(task.completed);

    const handleSubmit = () => {
        onSave({ title, description, dueDate, category, completed });
    };

    return (
        <div className="space-y-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <label>
                <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} /> Completed
            </label>
            <div className="flex justify-end gap-2">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );

}

export default EditTaskForm;