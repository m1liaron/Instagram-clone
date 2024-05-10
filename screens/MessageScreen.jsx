import React, {createRef, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, Button, Image, Pressable} from 'react-native';
import { getAuth } from 'firebase/auth';
import {collection, addDoc, query, orderBy, onSnapshot, getDocs, where, limit, getDoc} from 'firebase/firestore';
import { db } from '../firebase';
import {useAuthentication} from "../hooks/useAuthentication";
import {SafeAreaView} from "react-native-safe-area-context";
import BackArrow from "../components/BackArrow";
import {useGetUserById} from "../hooks/useGetUserById";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const MessageScreen = ({ route }) => {
    const { groupId, userEmail, anotherUserId } = route.params;
    const [userMessages, setUserMessages] = useState([]);
    const [message, setMessage] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const currentUser = useAuthentication();
    const userData = useGetUserById(userEmail)

    console.log(userData)
    const [anotherGroupId, setAnotherGroupId] = useState(null);

    const findGroupByEmail = async (email) => {
        try {
            const q = query(collection(db,'users', userEmail, 'groups'), where('owner_email', '==', email));
            const querySnapshot = await getDocs(q);
            const groups = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                groups.push(data);
            });

            setAnotherGroupId(groups[0].id)
            return groups; // Return the array of groups
        } catch (error) {
            console.error('Error finding group by email:', error);
            return null; // Return null if an error occurs
        }
    };

    findGroupByEmail(userEmail);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.email, 'groups', groupId, 'messages'), orderBy('timestamp', 'asc')), (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        try {

            await addDoc(collection(db, 'users', user.email, 'groups', groupId, 'messages'), {
                text: message,
                sender: user.email,
                profile_picture: currentUser.profile_picture,
                timestamp: new Date().getTime(),
            });

            // Add message to the other user's group
            await addDoc(collection(db, 'users', userEmail, 'groups', anotherGroupId, 'messages'), {
                text: message,
                sender: user.email,
                profile_picture: currentUser.profile_picture,
                timestamp: new Date().getTime(),
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const flatListRef = createRef();

    useEffect(() => {
        flatListRef.current.scrollToEnd();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {userData && (
                <Header userData={userData}/>
                )}
            {userMessages ? (
                <FlatList
                    ref={flatListRef}
                    data={userMessages}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10, alignItems: item.sender === user.email ? 'flex-end' : 'flex-start'}}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                {item.sender !== user.email && (
                                    <Image source={item.profile_picture} style={{width:20, height:20, borderRadius:50, marginRight:5}}/>
                                )}
                                <View style={{...styles.messageContainer,  backgroundColor: item.sender === user.email ? '#DCF8C6' : '#EAEAEA' , maxWidth:400, padding:10, borderRadius:5}}>
                                    {/*<Text style={styles.sender}>{item.sender}</Text>*/}
                                    <Text style={styles.message}>{item.text}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesList}
                />
            ) : (
                <Text style={{color:'#fff'}}>Напишіть щось чудове!😍</Text>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Надішліть повідомлення"
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                {message && (
                    <Pressable onPress={sendMessage} style={{backgroundColor:'#d029ae', padding:10, borderRadius:10, alignItems:'center'}}>
                        <FontAwesome name="send-o" style={styles.icon} color="#fff" size={20}/>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
};

const Header = ({userData}) => (
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            marginHorizontal:10,
            marginTop:10
        }}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <BackArrow/>
            </View>

            <View style={{flexDirection:'row',  alignItems:'center'}}>
                <Image
                    source={userData.profile_picture}
                    style={{width:30, height:30, borderRadius:50, marginRight:5}}
                />
                <View>
                    <Text style={{color:'#fff'}}>{userData.username}</Text>
                    <Text style={{color:'#fff'}}>Був в мережі</Text>
                </View>
            </View>

            <View style={{
                flexDirection:'row',
                alignItems:'center',
            }}>
                <Ionicons name="call-outline" size={20} color="#fff" style={{marginRight:10}}/>
                <AntDesign name="videocamera" size={20} color="#fff"/>
            </View>
        </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    messagesList: {
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        justifyContent:'flex-end',
    },
    sender: {
        fontWeight: 'bold',
        color:'#a8a8a8'
    },
    message: {},
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        color:'#fff',
        padding: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 8,
        color:'#fff',
    },
});

export default MessageScreen;