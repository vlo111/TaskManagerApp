import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

type Props = {
    onLogin: () => void;
};

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const login = () => {
        if (user === 'admin' && pass === '1234') {
            onLogin();
        } else {
            Alert.alert('Error', 'Wrong credentials');
        }
    };

    return (
        <KeyboardAvoidingView
            style={s.wrap}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={s.content}>
                <Text style={s.title}>Task App</Text>
                <Text style={s.sub}>Please log in</Text>

                <TextInput
                    style={s.input}
                    placeholder="Username"
                    value={user}
                    onChangeText={setUser}
                    autoCapitalize="none"
                />

                <TextInput
                    style={s.input}
                    placeholder="Password"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry
                />

                <TouchableOpacity style={s.btn} onPress={login}>
                    <Text style={s.btnTxt}>Login</Text>
                </TouchableOpacity>

                <Text style={s.hint}>Use admin / 1234</Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const s = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#222',
    },
    sub: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 14,
    },
    btn: {
        backgroundColor: '#007aff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 4,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    hint: {
        textAlign: 'center',
        marginTop: 16,
        color: '#999',
    },
});

export default LoginScreen;