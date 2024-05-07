import React, {useEffect, useState} from 'react';
import { FlatList} from 'react-native'
import Post from "./Post";
import {collectionGroup, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

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
