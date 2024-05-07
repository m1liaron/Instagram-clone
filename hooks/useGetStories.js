import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

export const useGetStories = (email) => {
    const [userStories, setUserStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            const querySnapshot = await getDocs(collection(db, 'users', email, 'stories'));
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

    return userStories
}