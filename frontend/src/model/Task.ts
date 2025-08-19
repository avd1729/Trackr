export interface Task {
    id?: number;
    title: string;
    description: string;
    addedDate?: string;
    dueDate: string;
    category: string;
    completed: boolean;
}