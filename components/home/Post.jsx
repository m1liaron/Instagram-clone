import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

const Post = (post) => {
    return (
        <View style={{marginBottom:30}}>
            <PostHeader post={post} />
            <Text></Text>
        </View>
    );
};

const PostHeader = (post) => {
    console.log(post.post.post)
   return ( <View>
        <View>
            {/*<Image source={post.imageUrl}/>*/}
            {/*<Text style={styles.text}>{post.username}</Text>*/}
        </View>
    </View> )
}

const styles = StyleSheet.create({
    text:{
        color: '#fff'
    }
})

export default Post;
