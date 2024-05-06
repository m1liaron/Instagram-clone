import {useEffect, useState} from "react";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";

export const useGetUserPosts = (email) => {
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'users', email, 'posts'));
            const posts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                posts.push(data);
            });
            setUserPosts(posts);
        };

        // Ensure user is logged in before fetching posts
        if (email) {
            fetchPosts();
        }
    }, [email]); // Dependency array to ensure useEffect runs when `user` changes

    return userPosts;
};