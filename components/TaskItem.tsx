import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.taskContent}
                onPress={() => onToggle(task.id)}
            >
                <View style={[
                    styles.checkbox,
                    task.completed && styles.checkboxChecked
                ]}>
                    {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>

                {/* NO underline on completed tasks - just gray text */}
                <Text style={[
                    styles.title,
                    task.completed && styles.titleCompleted
                ]}>
                    {task.title}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(task.id)}
            >
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    taskContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    titleCompleted: {
        // NO textDecorationLine - only gray color
        color: '#999',
    },
    deleteButton: {
        padding: 5,
    },
    deleteText: {
        fontSize: 20,
    },
});

export default TaskItem;