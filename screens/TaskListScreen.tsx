import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ListRenderItem
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    initializeTasks,
    isUsingAPI,
} from '@/utils/storage';
import {
    createTask as apiCreate,
    updateTask as apiUpdate,
    deleteTask as apiDelete,
} from '../utils/api';
import { Task } from '@/types';

type Props = {
    onLogout: () => void;
};

const TaskListScreen: React.FC<Props> = ({ onLogout }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        await initializeTasks();
        setTasks(getTasks());
        setLoading(false);
    };

    const add = async (title: string) => {
        addTask(title);
        setTasks(getTasks());
        if (isUsingAPI()) await apiCreate(title);
    };

    const toggle = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        toggleTask(id);
        setTasks(getTasks());
        if (isUsingAPI() && task) await apiUpdate(id, !task.completed);
    };

    const remove = async (id: string) => {
        deleteTask(id);
        setTasks(getTasks());
        if (isUsingAPI()) await apiDelete(id);
    };

    const refresh = async () => {
        setLoading(true);
        const loaded = await initializeTasks(true);
        setTasks(getTasks());
        setLoading(false);
        Alert.alert(loaded ? 'Tasks synced' : 'Sync failed');
    };

    const done = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
// Type ({item}: {item: any}) => React.JSX.Element is not assignable to type ListRenderItem<Task> | null | undefined
    const renderTask: ({item}: { item: any }) => React.JSX.Element  = ({ item }) => {
        return <TaskItem task={item} onToggle={toggle} onDelete={remove} />;
    };

    const renderEmpty = () => (
        <View style={s.empty}>
            <Text style={s.emptyTxt}>No tasks yet</Text>
            <Text style={s.emptySub}>Add your first task below</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={s.wrap}>
                <View style={s.center}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={s.loadTxt}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={s.wrap}>
            <View style={s.header}>
                <View style={{ flex: 1 }}>
                    <Text style={s.title}>My Tasks</Text>
                    <Text style={s.sub}>
                        {done}/{total} done · {percent}%
                    </Text>
                    {isUsingAPI() && (
                        <TouchableOpacity onPress={refresh}>
                            <Text style={s.api}>Tap to sync API</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={onLogout} style={s.logout}>
                    <Text style={s.logoutTxt}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList<Task>
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderTask as ListRenderItem<Task>}
                contentContainerStyle={s.list}
                ListEmptyComponent={renderEmpty}
            />

            <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)}>
                <Text style={s.addTxt}>+ Add Task</Text>
            </TouchableOpacity>

            <AddTaskModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onAdd={add}
            />
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadTxt: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    sub: {
        fontSize: 14,
        color: '#666',
    },
    api: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 4,
        fontWeight: '600',
    },
    logout: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
    },
    logoutTxt: {
        color: '#007AFF',
        fontSize: 15,
        fontWeight: '600',
    },
    list: {
        padding: 15,
        flexGrow: 1,
    },
    empty: {
        alignItems: 'center',
        marginTop: 180,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTxt: {
        color: '#333',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySub: {
        color: '#999',
        fontSize: 14,
    },
    addBtn: {
        backgroundColor: '#007AFF',
        margin: 15,
        marginBottom: 40,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default TaskListScreen;