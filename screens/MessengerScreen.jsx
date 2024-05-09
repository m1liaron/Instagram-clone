import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {getAuth} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import BackArrow from "../components/BackArrow";

const MessengerScreen = () => {
    const [userMessages, setUserMessages] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchGroups = async () => {
            const querySnapshot = await getDocs(collection(db, 'users', user.email, 'groups'));
            const posts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                posts.push(data);
            });
            setUserMessages(posts);
        };

        // Ensure user is logged in before fetching posts
        if (user.email) {
            fetchGroups();
        }
    }, [user.email]); // Dependency array to ensure useEffect runs when `user` changes

    const navigation = useNavigation();

    return (
        <View>
            <BackArrow/>
            <FlatList
                data={userMessages}
                renderItem={({item}) => (
                    <Pressable key={item.id} onPress={() => navigation.navigate('Message', {groupId: item.id, userEmail: item.user_email})}>
                        <Text style={{fontSize:40}}>{item.user}</Text>
                    </Pressable>
                )
            }/>
        </View>
    );
};

const styles = StyleSheet.create({})

export default MessengerScreen;
