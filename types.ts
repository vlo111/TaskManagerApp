export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

export type APITask = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};