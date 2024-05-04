import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import Post from "./Post";

const posts = [
    {
        id: '1',
        username: 'username1',
        imageUrl: 'https://example.com/image1.jpg',
        likes: 1234,
        caption: 'This is the caption for post 1.',
        comments: [
            { id: '1', username: 'user1', text: 'Comment 1' },
            { id: '2', username: 'user2', text: 'Comment 2' },
            { id: '3', username: 'user3', text: 'Comment 3' }
        ],
        timestamp: '2024-05-03T12:00:00Z'
    },
    {
        id: '2',
        username: 'username2',
        imageUrl: 'https://example.com/image2.jpg',
        likes: 567,
        caption: 'This is the caption for post 2.',
        comments: [
            { id: '4', username: 'user4', text: 'Comment 4' },
            { id: '5', username: 'user5', text: 'Comment 5' },
            { id: '6', username: 'user6', text: 'Comment 6' }
        ],
        timestamp: '2024-05-02T12:00:00Z'
    },
    // Add more posts as needed
];


const PostList = () => {
    return (
        <View>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Post post={item}/>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({})

export default PostList;
