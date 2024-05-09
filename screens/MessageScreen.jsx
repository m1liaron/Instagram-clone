import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import {collection, addDoc, query, orderBy, onSnapshot, getDocs, where, limit} from 'firebase/firestore';
import { db } from '../firebase';

const MessageScreen = ({ route }) => {
    const { groupId, userEmail } = route.params;
    const [userMessages, setUserMessages] = useState([]);
    const [message, setMessage] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

    const findGroupByEmail = async (email) => {
        console.log(`User email is : ${email}`)
        try {
            const q = query(collection(db,'users', user.email, 'groups'), where('owner_email', '==', email));
            const querySnapshot = await getDocs(q);
            const groups = [];


            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                groups.push(data);
            });

            return groups; // Return the array of groups
        } catch (error) {
            console.error('Error finding group by email:', error);
            return null; // Return null if an error occurs
        }
    };

    findGroupByEmail(userEmail)
        .then((groups) => {
            console.log('Groups found:', groups);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    useEffect(() => {
        const getMessages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users', user.email, 'groups', groupId, 'messages'));
                const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserMessages(messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        getMessages();
    }, []);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        try {
            // Add message to current user's group
            console.log(`user.email is ${user.email}`)
            console.log(`group id is ${groupId}`)

            console.log(`current user that we writing to user email is ${userEmail}`)

            await addDoc(collection(db, 'users', user.email, 'groups', groupId, 'messages'), {
                text: message,
                sender: user.email,
                timestamp: new Date().getTime(),
            });

            // Add message to the other user's group
            await addDoc(collection(db, 'users', userEmail, 'groups', groupId, 'messages'), {
                text: message,
                sender: userEmail,
                timestamp: new Date().getTime(),
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // console.log(userMessages)

    return (
        <View style={styles.container}>
            <FlatList
                data={userMessages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.sender}>{item.sender}</Text>
                        <Text style={styles.message}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesList: {
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
    },
    sender: {
        fontWeight: 'bold',
    },
    message: {},
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
});

export default MessageScreen;