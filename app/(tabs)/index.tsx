import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import TaskListScreen from '@/screens/TaskListScreen';
import LoginScreen from '@/screens/LoginScreen';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <StatusBar style="dark" />
            {loggedIn ? (
                <TaskListScreen onLogout={() => setLoggedIn(false)} />
            ) : (
                <LoginScreen onLogin={() => setLoggedIn(true)} />
            )}
        </>
    );
}