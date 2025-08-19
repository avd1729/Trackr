import type { Task } from "@/model/Task";
import type { TaskDTO } from "@/dto/TaskDTO";

async function getAllTasks(): Promise<Array<Task>> {
    const response = await fetch("http://localhost:8080/api/task");
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return await response.json();
}

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

// Test code - fixed to actually test updateTask
(async () => {
    const newTask: TaskDTO = {
        title: "Learn TanStack - 2",
        description: "Explore query + router",
        dueDate: "2025-08-20",
        category: "Learning",
        completed: false,
    };
    
    try {
        // First create a task
        const createdTask = await createTask(newTask);
        console.log("Task created:", createdTask);
        
        // Then update it
        const updatedTaskDTO: TaskDTO = {
            ...newTask,
            title: "Learn TanStack - Updated",
            completed: true,
        };
        
        if (createdTask.taskId === undefined) {
            throw new Error("Task ID is undefined");
        }
        const updatedTask = await updateTask(updatedTaskDTO, createdTask.taskId);
        console.log("Task updated:", updatedTask);
        
        const tasks = await getAllTasks();
        console.log("All tasks:", tasks);
    } catch (err) {
        console.error("Error:", err);
    }
})();