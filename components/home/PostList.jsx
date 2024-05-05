import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import Post from "./Post";
import {collectionGroup, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

// const posts = [
//     {
//         id: '1',
//         username: 'Alex',
//         imageUrl: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
//         image:'../../assets/Beaver-hero.jpg',
//         likes: 1234,
//         caption: 'This is the caption for post 1.',
//         comments: [
//             { id: '1', username: 'user1', text: 'Comment 1' },
//             { id: '2', username: 'user2', text: 'Comment 2' },
//             { id: '3', username: 'user3', text: 'Comment 3' }
//         ],
//         timestamp: '2024-05-03T12:00:00Z'
//     },
//     {
//         id: '2',
//         username: 'Beaver',
//         imageUrl: 'https://www.oregonzoo.org/sites/default/files/styles/16x9_fallback/public/2023-08/04-19-2021fb-172.jpg?h=82f92a78&itok=TlLsPDRv',
//         image:'https://cdn.pixabay.com/photo/2016/06/10/16/23/beaver-1448389_960_720.jpg',
//         likes: 567,
//         caption: 'This is the caption for post 2.',
//         comments: [
//             { id: '4', username: 'user4', text: 'Comment 4' },
//             { id: '5', username: 'user5', text: 'Comment 5' },
//             { id: '6', username: 'user6', text: 'Comment 6' }
//         ],
//         timestamp: '2024-05-02T12:00:00Z'
//     },
//     // Add more posts as needed
// ];


const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
       onSnapshot(collectionGroup(db, 'posts'), snapshot => {
            const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(newPosts);
        });

    }, []); // Run effect only once on component
    return (
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Post post={item}/>
                )}
            />
    );
};

export default PostList;
