// Enhanced storage with API integration
import { fetchTasksFromAPI } from './api';

// In-memory storage with initial mock data
let tasks = [
    { id: '1', title: 'Complete test assignment', completed: false },
    { id: '2', title: 'Review React Native docs', completed: false },
    { id: '3', title: 'Setup development environment', completed: true },
];

let isLoadedFromAPI = false;

// Load tasks from API on first call
export const initializeTasks = async () => {
    if (!isLoadedFromAPI) {
        const apiTasks = await fetchTasksFromAPI();
        if (apiTasks && apiTasks.length > 0) {
            tasks = apiTasks;
            isLoadedFromAPI = true;
            return true;
        }
    }
    return false;
};

export const getTasks = () => {
    return [...tasks];
};

export const addTask = (title) => {
    const newTask = {
        id: Date.now().toString(),
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    return newTask;
};

export const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
};

export const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
};

export const isUsingAPIData = () => {
    return isLoadedFromAPI;
};