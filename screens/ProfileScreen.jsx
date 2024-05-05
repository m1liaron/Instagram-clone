import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { app, db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser
        setUserData(user)
    }, []);

    console.log(userData)
    return (
        <View>
            <Text>ProfileScreen</Text>
            {userData && (
                <View>
                    <Text>User ID: {userData.uid}</Text>
                    <Text>Email: {userData.email}</Text>
                    {/* Add other user data fields here */}
                </View>
            )}
        </View>
    );
};

export default ProfileScreen;
