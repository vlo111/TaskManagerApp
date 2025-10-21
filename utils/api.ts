import { APITask, Task } from '@/types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const res = await fetch(`${API_URL}?_limit=10`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data: APITask[] = await res.json();
        return data.map(item => ({
            id: item.id.toString(),
            title: item.title,
            completed: item.completed,
        }));
    } catch (err) {
        console.error('Fetch error:', err);
        return [];
    }
};

export const createTask = async (title: string): Promise<Task | null> => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false, userId: 1 }),
        });

        if (!res.ok) throw new Error('Create failed');

        const data: APITask = await res.json();
        return {
            id: data.id.toString(),
            title: data.title,
            completed: data.completed,
        };
    } catch (err) {
        console.error('Create error:', err);
        return null;
    }
};

export const updateTask = async (id: string, completed: boolean): Promise<boolean> => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        });
        return res.ok;
    } catch (err) {
        console.error('Update error:', err);
        return false;
    }
};

export const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        return res.ok;
    } catch (err) {
        console.error('Delete error:', err);
        return false;
    }
};