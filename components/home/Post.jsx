import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList, TextInput} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import {getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {collection, arrayUnion, arrayRemove, doc, updateDoc} from "firebase/firestore";
import {useAuthentication} from "../../hooks/useAuthentication";
import {useNavigation} from "@react-navigation/native";

const Post = ({post}) => {

    const addComment = (post, data) => {
        console.log(post)
        const postRef = doc(db, 'users', post.owner_email, 'posts', post.id);
        updateDoc(postRef, {
            comments_by_users: arrayUnion(data)
        }).then(() => {
            console.log('Document updated');
        }).catch(error => {
            console.error('Error updating document: ', error);
        });
    }
    const handleLike = (post) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const currentLikesStatus = !post.likes_by_users.includes(user.email);

        const postRef = doc(db, 'users', post.owner_email, 'posts', post.id);

        updateDoc(postRef, {
            likes_by_users: currentLikesStatus ? arrayUnion(user.email) : arrayRemove(user.email)
        }).then(() => {
            console.log('Document updated');
        }).catch(error => {
            console.error('Error updating document: ', error);
        });
    };

    return (
        <View style={{marginBottom:30}}>
            <PostHeader post={post} />
            <PostImage post={post}/>

            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter post={post} handleLike={handleLike} addComment={addComment}/>
            </View>
        </View>
    );
};

const PostHeader = ({post}) => {
    const navigation = useNavigation();
    const currentUser = useAuthentication()
    return (
        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
            <Pressable style={styles.headerContainer} onPress={() => {
                currentUser.email === post.owner_email ? navigation.navigate('Profile') : navigation.navigate('UserProfile', {userEmail: post.owner_email})
            }}>
                <Image style={styles.avatar} source={post.profile_picture}/>
                <Text style={styles.text}>{post.user}</Text>
            </Pressable>
            <Text style={styles.text}>...</Text>
        </View>
    )
}

const PostImage = ({post}) => (
    <Pressable style={{width:'100%', height: 450}}>
        <Image
            style={{height: '100%', resizeMode: 'cover'}}
            source={{uri: post.imageUrl}}
        />
    </Pressable>
)

const PostFooter = ({handleLike, post, addComment}) => {
    return(
        <View>
            <View style={styles.iconsList}>
                <View style={styles.iconsContainer}>
                    <Pressable onPress={() => handleLike(post)}>
                        {post.likes_by_users.includes(post.owner_email) ? (
                            <AntDesign name='heart' style={styles.icon} color='red' size={20}/>
                        ) : (
                            <AntDesign name="hearto" style={styles.icon} color='#fff' size={20}/>
                        )}
                    </Pressable>
                    <FontAwesome name="comment-o" style={styles.icon} color="#fff" size={20}/>
                    <FontAwesome name="send-o" style={styles.icon} color="#fff" size={20}/>
                </View>
                    <Fontisto name="favorite" color='#fff' size={20}/>
            </View>
            <View>
                <Text style={styles.footerText}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
                <Text style={styles.footerText}>{post.user}  {post.caption}</Text>
            </View>
            <View>
                <Pressable>
                    <CommentsSection post={post}/>
                </Pressable>
                    <Comments post={post} addComment={addComment}/>
            </View>
        </View>
    )
}

const CommentsSection = ({post}) => (
        <View>
            {!!post.comments_by_users.length && (
                <Text style={styles.text}>
                    {post.comments_by_users.length > 1 ? ' all' : ''} {post.comments_by_users.length}
                    {post.comments_by_users.length > 1 ? 'comments' : 'comment'}
                </Text>
            )}
        </View>
    )

const Comments = ({post, addComment}) => {
    const [text, setText] = useState('')
    const userData = useAuthentication()

    return (
        <View>
            <FlatList
                data={post.comments_by_users}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Image source={{ uri: item.profile_picture }} style={{width:30, height:30, marginRight: 10, borderRadius:50}}/>
                        <View>
                            <Text style={styles.footerText}>{item.username}</Text>
                            <Text style={styles.text}> {item.text}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput
                placeholder="Напиши щось чудове!"
                onChangeText={(text) => setText(text)}
                style={{color:'#fff'}}
            />
            <Pressable onPress={() => addComment(post, {
                username: userData.username,
                email: userData.email,
                profile_picture: userData.profile_picture,
                owner_uid: userData.owner_uid,
                text
            })}>
                <Text style={styles.text}>Відіслати</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        marginHorizontal:10,
        alignItems:'center',
        flexDirection:'row',
        marginBottom:10,
    },
    text:{
        color: '#fff'
    },
    footerText:{
        color: '#fff',
        fontSize:13,
        marginBottom:5
    },
    avatar:{
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft:3,
        borderWidth: 3,
        borderColor: '#ff8501',
        marginRight:10
    },
    iconsList:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    iconsContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    icon:{
        marginRight:10
    }
})

export default Post;
