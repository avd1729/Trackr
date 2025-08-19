import type { Task } from "@/model/Task";
import type { TaskDTO } from "@/dto/TaskDTO";

/**
 * function to get all tasks.
 * @returns {Promise<Array<Task>>}
 */
async function getAllTasks(): Promise<Array<Task>> {
    const response = await fetch("http://localhost:8080/api/task");
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return await response.json();
}

/**
 * function to create a new task.
 * @param taskDTO 
 * @returns {Promise<Task>}
 */
async function createTask(taskDTO: TaskDTO): Promise<Task> {
    const formattedDueDate = new Date(taskDTO.dueDate).toISOString().slice(0, 19);
    const task: Task = {
        title: taskDTO.title,
        description: taskDTO.description,
        category: taskDTO.category,
        dueDate: formattedDueDate,
        completed: taskDTO.completed
    };
    
    const response = await fetch("http://localhost:8080/api/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    
    if (!response.ok) {
        throw new Error("Failed to create task");
    }
    
    return await response.json();
}

/**
 * function to update existing task.
 * @param taskDTO 
 * @param id 
 * @returns {Promise<Task>}
 */
async function updateTask(taskDTO: TaskDTO, id: number): Promise<Task> {
    const formattedDueDate = new Date(taskDTO.dueDate).toISOString().slice(0, 19);
    const task: Task = {
        title: taskDTO.title,
        description: taskDTO.description,
        category: taskDTO.category,
        dueDate: formattedDueDate,
        completed: taskDTO.completed,
    };
    
    const response = await fetch(`http://localhost:8080/api/task/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
    
    return await response.json();
}

/**
 * function to delete existing task.
 * @param id 
 * @returns {Promise<Task>}
 */
async function deleteTask(id: number): Promise<Task> {
    const response = await fetch(`http://localhost:8080/api/task/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
    
    return await response.json();
}