import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

const AddTaskModal = ({ visible, onClose, onAdd }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleAdd = () => {
        if (taskTitle.trim()) {
            onAdd(taskTitle.trim());
            setTaskTitle('');
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>New Task</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter task title..."
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        autoFocus
                        multiline
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.addButton]}
                            onPress={handleAdd}
                        >
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    addButton: {
        backgroundColor: '#007AFF',
    },
    cancelText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    addText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddTaskModal;