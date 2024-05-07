import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export const useGetUserById = (email) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userDocRef = doc(db, 'users', email);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setUserData(data);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting user:', error);
            }
        };

        if (email) {
            getUser();
        }

    }, []);

    return userData;
};