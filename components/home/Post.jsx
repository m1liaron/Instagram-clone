import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import {getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {collection, arrayUnion, arrayRemove, doc, updateDoc} from "firebase/firestore";

const Post = ({post}) => {

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
                <PostFooter post={post} handleLike={handleLike}/>
            </View>
        </View>
    );
};

const PostHeader = ({post}) => {
    return (
        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
            <View style={styles.headerContainer}>
                <Image style={styles.avatar} source={post.profile_picture}/>
                <Text style={styles.text}>{post.user}</Text>
            </View>
            <Text style={styles.text}>...</Text>
        </View>
    )
}

const PostImage = ({post}) => (
    <View style={{width:'100%', height: 450}}>
        <Image
            style={{height: '100%', resizeMode: 'cover'}}
            source={{uri: post.imageUrl}}
        />
    </View>
)

const PostFooter = ({handleLike, post}) => {
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
                {post.comments.length ? (
                    <Text>No comments</Text>
                ) : (
                    <Comments post={post}/>
                )}
            </View>
        </View>
    )
}

const CommentsSection = ({post}) => (
        <View>
            {!!post.comments.length && (
                <Text style={styles.text}>
                    {post.comments.length > 1 ? ' all' : ''} {post.comments.length}
                    {post.comments.length > 1 ? 'comments' : 'comment'}
                </Text>
            )}
        </View>
    )

const Comments = ({post}) => (
    <View>
        <FlatList
            data={post.comments}
            renderItem={({ item }) => (
                <View>
                    <Text style={styles.footerText}>{item.username} {item.text}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
)

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
