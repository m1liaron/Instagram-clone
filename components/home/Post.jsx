import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

const Post = (post) => {
    return (
        <View style={{marginBottom:30}}>
            <PostHeader post={post} />
            <PostImage post={post}/>

            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter post={post}/>
            </View>
        </View>
    );
};

const PostHeader = ({post: {post} }) => (
    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
        <View style={styles.headerContainer}>
            <Image style={styles.avatar} source={post.imageUrl}/>
            <Text style={styles.text}>{post.username}</Text>
        </View>
        <Text style={styles.text}>...</Text>
    </View>
)

const PostImage = ({post: {post}}) => (
    <View style={{width:'100%', height: 450}}>
        <Image
            style={{height: '100%', resizeMode: 'cover'}}
            source={{uri: post.image}}
        />
    </View>
)

const PostFooter = ({post: {post}}) => {
    return(
        <View>
            <View style={styles.iconsList}>
                <View style={styles.iconsContainer}>
                    <AntDesign name="hearto" style={styles.icon} color="#fff" size={20}/>
                    <FontAwesome name="comment-o" style={styles.icon} color="#fff" size={20}/>
                    <FontAwesome name="send-o" style={styles.icon} color="#fff" size={20}/>
                </View>
                <Fontisto name="favorite" color="#fff" size={20}/>
            </View>
            <View>
                <Text style={styles.footerText}>{post.likes} likes</Text>
                <Text style={styles.footerText}>{post.caption}</Text>
            </View>
            <View>
                <Pressable>
                    <Text style={{...styles.text, color:'gray'}}>View all {post.comments.length} comments</Text>
                </Pressable>
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
