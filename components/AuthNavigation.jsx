import Navigator, {MainNavigator, SignedOutStack} from "./Navigator";
import {useEffect, useState} from "react";
import {app} from "../firebase";

import { getAuth } from 'firebase/auth'
import LoadingScreen from "../screens/LoadingScreen";

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false); // Set loading to false once authentication state is determined
        });

        return unsubscribe; // Cleanup subscription
    }, []); // Empty dependency array ensures useEffect only runs once


    if (loading) {
        // Show loading screen while checking authentication state
        return <LoadingScreen />;
    }

    return currentUser ? <Navigator /> : <SignedOutStack />;
}
export  default  AuthNavigation