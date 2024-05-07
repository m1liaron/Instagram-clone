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

const ProfileScreen = ({route}) => {
    const {userEmail} = route.params;
    const navigation = useNavigation();

    const userData = useGetUserById(userEmail)
    const userPosts = useGetUserPosts(userEmail)
    const userStories = useGetStories(userEmail)
    const currentUser = useAuthentication();

    const isFollowing = userData?.followers_users.map(item => item.email).includes(currentUser?.email);

    const follow = () => {
        const postRef = doc(db, 'users', userEmail);
            updateDoc(postRef, {
                followers_users: !isFollowing ? arrayUnion(currentUser) : arrayRemove(currentUser)
            }).then(() => {
                console.log('Document updated');
            }).catch(error => {
                console.error('Error updating document: ', error);
            });
    }

    const navigateTo = (connection) => {
        navigation.navigate('Connections', {userEmail: userData.email, state: connection})
    }

    return (
        <SafeAreaView style={styles.container}>
            {userData ? (
                <View>
                    <View style={styles.header}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.titleName}>{userData.username}</Text>
                            <SimpleLineIcons name="arrow-down" color="#fff" size={12}/>
                        </View>
                        <View style={styles.iconList}>
                            <Entypo name="email" size={30} style={styles.icon}/>
                            <AntDesign name="plussquareo" size={30} style={styles.icon}/>
                            <Feather name="menu" size={30} style={styles.icon}/>
                        </View>
                    </View>
                    <View>
                        <View style={styles.main}>
                            <View style={{marginRight:40}}>
                                <Image source={{ uri: userData.profile_picture || 'https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png' }} style={styles.profilePicture} />
                            </View>

                            <View style={styles.flex}>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userPosts?.length}</Text>
                                    <Text style={styles.text}>дописи</Text>
                                </View>
                               <Pressable onPress={() => navigateTo('followers_users')}>
                                   <View style={styles.activity}>
                                       <Text style={styles.text}>{userData.followers_users?.length}</Text>
                                       <Text style={styles.text}>читачі</Text>
                                   </View>
                               </Pressable>
                                <Pressable onPress={() => navigateTo('following_users')}>
                                    <View style={styles.activity}>
                                        <Text style={styles.text}>{userData.following_users?.length}</Text>
                                        <Text style={styles.text}>стежить за</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={{...styles.text, marginLeft:20}}>{userData.username}</Text>
                        <View>
                            {userData.biography && (
                                <Text style={{...styles.text, marginLeft:20, fontSize:15}}>{userData.biography}</Text>
                            )}
                        </View>
                        <View style={{...styles.flex, marginBottom:15}}>
                                <Pressable style={{...styles.activityButton, backgroundColor:!isFollowing ? '#4962a0' : '#444444'}} onPress={follow}>
                                    <Text style={{...styles.text, textAlign:'center'}}>{!isFollowing ? 'Стежити' : 'Відстежується'}</Text>
                                </Pressable>
                            <Pressable style={{...styles.activityButton, backgroundColor:'#e7e7e7'}}>
                                <Text style={{textAlign:'center'}}>Повідомлення</Text>
                            </Pressable>
                        </View>
                        <View style={{...styles.flex, marginHorizontal: 15}}>
                            <FlatList
                                data={userStories}
                                renderItem={({ item }) => (
                                    <View style={styles.story} key={item.id}>
                                        <Image
                                            source={item.imageUrl}
                                            style={styles.storyImage}
                                        />
                                    </View>
                                )}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            {userPosts?.length && (
                                <FlatList
                                    horizontal
                                    data={userPosts}
                                    renderItem={({ item }) => (
                                        <Pressable key={item.id} onPress={() => navigation.navigate('Posts', { userEmail: userData.email, selectedPostId: item.id})}>
                                            <View>
                                                <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100, margin: 5 }} />
                                            </View>
                                        </Pressable>
                                    )}
                                />
                            )}
                        </View>
                    </View>
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
        marginRight:7
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
