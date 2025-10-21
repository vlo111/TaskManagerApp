import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    initializeTasks,
    isUsingAPI,
} from '../utils/storage';
import {
    createTask as createTaskAPI,
    updateTask as updateTaskAPI,
    deleteTask as deleteTaskAPI,
} from '../utils/api';
import { Task } from '../utils/types';

interface Props {
    onLogout: () => void;
}

const TaskListScreen: React.FC<Props> = ({ onLogout }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
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

    const handleAdd = async (title: string) => {
        addTask(title);
        setTasks(getTasks());

        if (isUsingAPI()) {
            await createTaskAPI(title);
        }
    };

    const handleToggle = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        toggleTask(id);
        setTasks(getTasks());

        if (isUsingAPI() && task) {
            await updateTaskAPI(id, !task.completed);
        }
    };

    const handleDelete = async (id: string) => {
        deleteTask(id);
        setTasks(getTasks());

        if (isUsingAPI()) {
            await deleteTaskAPI(id);
        }
    };

    const handleRefresh = async () => {
        await loadTasks();
        if (isUsingAPI()) {
            Alert.alert('Success', 'Tasks refreshed from API');
        }
    };

    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading tasks...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>My Tasks</Text>
                    <Text style={styles.headerSubtitle}>
                        {completed} of {total} completed ({progress}%)
                    </Text>
                    {isUsingAPI() && (
                        <TouchableOpacity onPress={handleRefresh}>
                            <Text style={styles.apiIndicator}>
                                📡 API Active (tap to refresh)
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <Text style={styles.emptyText}>No tasks yet!</Text>
                        <Text style={styles.emptySubtext}>
                            Tap the button below to add your first task
                        </Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>

            <AddTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAdd}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
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
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    apiIndicator: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 4,
        fontWeight: '600',
    },
    logoutBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
    },
    logoutText: {
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
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#333',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
    },
    addButton: {
        backgroundColor: '#007AFF',
        margin: 15,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default TaskListScreen;