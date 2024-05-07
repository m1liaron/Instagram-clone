import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {getAuth} from "firebase/auth";
import {app, db} from "../../firebase";
import {addDoc, collection, limit, onSnapshot, query, serverTimestamp, where} from "firebase/firestore";
import {useNavigation} from "@react-navigation/native";
import {LoadImage} from "../newPost/AddNewPost";

const AddNewStory = () => {
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const [image, setImage] = useState('')

    const navigation = useNavigation();

    const getUserName = () => {
        const auth = getAuth(app);
        const user =  auth.currentUser;

        const q = query(collection(db, 'users'), where('owner_uid', '==', user.uid), limit(1));

        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.forEach(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                });
            });
        });

        return unsubscribe;
    };

    useEffect(() => {
        getUserName();
    }, [])


    const uploadStoryToFirebase = (imageUrl) => {
        console.log(imageUrl)
        console.log('Share story')
        const auth = getAuth(app);
        const user =  auth.currentUser;
        const unsubscribe = addDoc(collection(db, 'users', user.email, 'stories'), {
            imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: user.uid,
            owner_email: user.email,
        }).then(() =>
            navigation.goBack()
        )
        .catch((error) => {
            console.log(error)
        })

        return unsubscribe;
    }

    return (
        <View>

            <LoadImage image={image} setImage={setImage}/>
            <Pressable onPress={() => uploadStoryToFirebase(image, )}>
                <Text style={{color:'#fff'}}>Share stories!</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({})

export default AddNewStory;
