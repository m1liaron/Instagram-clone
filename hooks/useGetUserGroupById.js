import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export const useGetUserGroupById = (userEmail, id) => {
    const [userGroup, setUserGroup] = useState(null);

    useEffect(() => {
        const getUserGroup = async () => {
            try {
                const groupRef = doc(db, 'users', userEmail, 'groups', id);
                const groupSnapshot = await getDoc(groupRef);

                if (groupSnapshot.exists()) {
                    // Extract and return the group data
                    setUserGroup({ id: groupSnapshot.id, ...groupSnapshot.data() });
                } else {
                    // If the group does not exist, return null or handle accordingly
                    console.log('No such document!');
                    setUserGroup(null);
                }
            } catch (error) {
                console.error('Error fetching user group:', error);
                throw error; // Rethrow the error for handling in the calling code
            }
        };

        if (id) {
            getUserGroup();
        }
    }, [userEmail, id]);

    return userGroup;
}
