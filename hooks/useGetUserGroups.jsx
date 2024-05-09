import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

export const useGetUserGroups = (email) => {
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const getGroups =  async () => {
            const querySnapshot = await getDocs(collection(db, 'users', email, 'groups'));
            const posts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                posts.push(data);
            });
            setUserGroups(posts)
        }
        if(email){
            getGroups()
        }
    }, [email]);

    return userGroups;
}