import { fetchTasks } from './api';
import { Task } from '@/types';

let tasks: Task[] = [
    { id: '1', title: 'Complete test assignment', completed: false },
    { id: '2', title: 'Review React Native docs', completed: false },
    { id: '3', title: 'Setup development environment', completed: true },
];

let apiLoaded = false;

export const initializeTasks = async (forceRefresh = false): Promise<boolean> => {
    if (apiLoaded && !forceRefresh) return true;

    const apiTasks = await fetchTasks();
    if (apiTasks.length > 0) {
        tasks = apiTasks;
        apiLoaded = true;
        return true;
    }
    return false;
};

export const getTasks = (): Task[] => [...tasks];

export const addTask = (title: string): Task => {
    const newTask: Task = {
        id: Date.now().toString(),
        title,
        completed: false,
    };
    tasks.push(newTask);
    return newTask;
};

export const toggleTask = (id: string): void => {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
};

export const deleteTask = (id: string): void => {
    tasks = tasks.filter(t => t.id !== id);
};

export const isUsingAPI = (): boolean => apiLoaded;