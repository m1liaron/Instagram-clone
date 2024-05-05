import Navigator, {MainNavigator, SignedOutStack} from "./Navigator";
import {useEffect, useState} from "react";
import {app} from "../firebase";

import { getAuth } from 'firebase/auth'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));

        return unsubscribe; // Cleanup subscription
    }, []); // Empty dependency array ensures useEffect only runs once

    return currentUser ? <Navigator /> : <SignedOutStack />;
}
export  default  AuthNavigation