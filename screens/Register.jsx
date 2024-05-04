import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <View>
            <TextInput
                placeholder="name"
                value={name}
                onChangeText={(name) => setName(name)}
            />
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(name) => setEmail(name)}
            />
            <TextInput
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(name) => setPassword(name)}
            />
            <Pressable
                onPress={() => onSignUp()}
            >
                <Text></Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({})

export default Register;
