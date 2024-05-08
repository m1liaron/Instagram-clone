import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList, ActivityIndicator} from 'react-native'; // Import Image from react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {useNavigation} from "@react-navigation/native";
import {useGetUserPosts} from "../hooks/useGetUserPosts";
import {useGetUserById} from "../hooks/useGetUserById";
import {useGetStories} from "../hooks/useGetStories";
import {arrayUnion, doc, updateDoc, arrayRemove} from "firebase/firestore";
import {db} from "../firebase";
import {useAuthentication} from "../hooks/useAuthentication";
import BackArrow from "../components/BackArrow";
import Fontisto from "react-native-vector-icons/Fontisto";
import Profile from "../components/profile/Profile";

const ProfileScreen = ({route}) => {
    const {userEmail} = route.params;
    const userData = useGetUserById(userEmail)

    return (
        <SafeAreaView style={styles.container}>
            {userData ? (
                <View>
                    <View style={styles.header}>
                        <View style={styles.flex}>
                            <BackArrow/>
                            <Text style={styles.titleName}>{userData.username}</Text>
                        </View>
                        <View style={styles.flex}>
                            <Fontisto name="bell" color='#fff' size={25} style={{marginRight:30}}/>
                            <Entypo name="dots-three-vertical"  color='#fff' size={25}/>
                        </View>
                    </View>
                    <Profile userData={userData}/>
                </View>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    },
    iconList:{
        alignItems:'center',
        flexDirection:'row'
    },
    icon:{
        color:'#fff',
        marginRight:30
    },
    header:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20,
        marginBottom:40
    },
    titleName:{
        fontSize:27,
        fontWeight:'500',
        color:'#fff',
        marginHorizontal:35
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
    profilePicture: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 10,
    },
    main:{
        marginHorizontal:40,
        alignItems:'center',
        flexDirection:'row',
    },
    plus:{
        position:'absolute',
        bottom: 12,
        left: 47,
        backgroundColor: '#335ec6', // Background color set to blue
        borderRadius: 100, // Border radius set to a large number to make it circular
        width: 30, // Width of the circle
        height: 30, // Height of the circle
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
        borderWidth: 2,
        borderColor:"#000"
    },
    activity:{
        marginRight:20,
        alignItems:'center'
    },
    activityButton:{
        padding:4,
        width:'40%',
        backgroundColor:'#4962a0',
        borderRadius:5,
        marginRight:9,
    },
    flex:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    story:{
        marginRight:10
    },
    storyImage:{
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:5,
        borderColor:'#494949'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ProfileScreen;
