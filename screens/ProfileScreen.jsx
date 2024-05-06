import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native'; // Import Image from react-native
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import {collection, doc, getDocs, getDoc, onSnapshot, collectionGroup} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {useNavigation} from "@react-navigation/native";
import {useAuthentication} from "../hooks/useAuthentication";
import {useGetUserPosts} from "../hooks/useGetUserPosts";

const ProfileScreen = () => {
    const [userStories, setUserStories] = useState([]);

    const navigation = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;
    const userData = useAuthentication()
    const userPosts = useGetUserPosts(user.email)

    useEffect(() => {
        const fetchStories = async () => {
            const querySnapshot = await getDocs(collection(db, 'users', user.email, 'stories'));
            const stories = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                stories.push(data);
            });
            setUserStories(stories);
        };

            fetchStories();
    }, []); // Run effect only once on component

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
                                <View style={styles.plus}>
                                    <Entypo name='plus' size={17} color='#fff'/>
                                </View>
                            </View>

                            <View style={styles.flex}>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userPosts?.length}</Text>
                                    <Text style={styles.text}>дописи</Text>
                                </View>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userData.followers_users?.length}</Text>
                                    <Text style={styles.text}>читачі</Text>
                                </View>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userData.following_users?.length}</Text>
                                    <Text style={styles.text}>стежить за</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{...styles.text, marginLeft:20}}>{userData.username}</Text>
                        <View>
                            {userData.biography && (
                                <Text style={{...styles.text, marginLeft:20, fontSize:15}}>{userData.biography}</Text>
                            )}
                        </View>
                        {user.email !== user.email && (
                            <View style={{...styles.flex, marginBottom:15}}>
                                <Pressable style={{...styles.activityButton, backgroundColor:'#4962a0'}}>
                                    <Text style={{...styles.text, textAlign:'center'}}>Стежити</Text>
                                </Pressable>
                                <Pressable style={{...styles.activityButton, backgroundColor:'#e7e7e7'}}>
                                    <Text style={{textAlign:'center'}}>Повідомлення</Text>
                                </Pressable>
                            </View>
                        )}
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
                <Text>Loading...</Text>
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
        padding:8,
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
    }
});

export default ProfileScreen;
