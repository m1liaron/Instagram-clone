import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native'; // Import Image from react-native
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getDoc} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const docRef = doc(db, 'users', user.email); // Assuming user documents are stored under 'users' collection with user's email as document ID
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);
                    } else {
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.error('Error getting document:', error);
                });
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'users', user.email, 'posts'));
            const posts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                posts.push(data);
            });
            setUserPosts(posts);
        };

        // Ensure user is logged in before fetching posts
        if (user) {
            fetchPosts();
        }
    }, [user]); // Dependency array to ensure useEffect runs when `user` changes

    console.log(userData)
    console.log(userPosts)
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
                                    <Text style={styles.text}>{userPosts.length}</Text>
                                    <Text style={styles.text}>дописи</Text>
                                </View>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userData.followers_users.length}</Text>
                                    <Text style={styles.text}>читачі</Text>
                                </View>
                                <View style={styles.activity}>
                                    <Text style={styles.text}>{userData.following_users.length}</Text>
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
                        <View style={styles.flex}>
                            <View style={styles.story}>
                                <Image source={{uri: "https://cdn.britannica.com/83/28383-050-33D8DB80/Beaver.jpg"}} style={styles.storyImage} />
                                <Text style={styles.text}>My beaver</Text>
                            </View>
                            <View style={styles.story}>
                                <Image source={{uri: "https://cdn.britannica.com/83/28383-050-33D8DB80/Beaver.jpg"}} style={styles.storyImage} />
                                <Text style={styles.text}>My beaver</Text>
                            </View>
                            <View style={styles.story}>
                                <Image source={{uri: "https://cdn.britannica.com/83/28383-050-33D8DB80/Beaver.jpg"}} style={styles.storyImage} />
                                <Text style={styles.text}>My beaver</Text>
                            </View>
                            <View style={styles.story}>
                                <Image source={{uri: "https://cdn.britannica.com/83/28383-050-33D8DB80/Beaver.jpg"}} style={styles.storyImage} />
                                <Text style={styles.text}>My beaver</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            <FlatList
                                horizontal
                                data={userPosts}
                                renderItem={({ item }) => (
                                    <View>
                                        <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100, margin: 5 }} />
                                    </View>
                                )}
                            />
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
