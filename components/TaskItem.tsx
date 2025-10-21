import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '@/types';

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={s.box}>
            <TouchableOpacity
                style={s.main}
                onPress={() => onToggle(task.id)}
            >
                <View style={[s.check, task.completed && s.checked]}>
                    {task.completed && <Text style={s.mark}>✓</Text>}
                </View>
                <Text style={[s.txt, task.completed && s.done]}>
                    {task.title}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={s.del}
                onPress={() => onDelete(task.id)}
            >
                <Text style={s.delIcon}>×</Text>
            </TouchableOpacity>
        </View>
    );
};

const s = StyleSheet.create({
    box: {
        flexDirection: 'row',
        backgroundColor: '#fff',
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
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    check: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#007AFF',
    },
    mark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    done: {
        color: '#999',
    },
    del: {
        padding: 5,
    },
    delIcon: {
        fontSize: 24,
        color: '#ff3b30',
        fontWeight: '300',
    },
});

export default TaskItem;