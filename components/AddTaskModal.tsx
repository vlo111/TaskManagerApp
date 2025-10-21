import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onAdd: (title: string) => void;
};

const AddTaskModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');

    const submit = () => {
        const txt = title.trim();
        if (txt) {
            onAdd(txt);
            setTitle('');
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
            <View style={s.overlay}>
                <View style={s.modal}>
                    <Text style={s.heading}>New Task</Text>

                    <TextInput
                        style={s.input}
                        placeholder="Please type task name"
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                        multiline
                    />

                    <View style={s.btns}>
                        <TouchableOpacity style={[s.btn, s.cancel]} onPress={onClose}>
                            <Text style={s.cancelTxt}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[s.btn, s.add]} onPress={submit}>
                            <Text style={s.addTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const s = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    heading: {
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
    btns: {
        flexDirection: 'row',
        gap: 10,
    },
    btn: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancel: {
        backgroundColor: '#f0f0f0',
    },
    add: {
        backgroundColor: '#007AFF',
    },
    cancelTxt: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    addTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddTaskModal;