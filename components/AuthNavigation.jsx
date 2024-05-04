import Navigator, {SignedOutStack} from "./Navigator";
import {useEffect, useState} from "react";
import {app} from "../firebase";

import { getAuth } from 'firebase/auth'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const userHandler = user => user ? setCurrentUser(user) : null

    useEffect(
 () => {
        const auth = getAuth(app);
        return auth.onAuthStateChanged(user => userHandler(user))
    }, []);

    return (
        <>
            {currentUser ? <Navigator/> : <SignedOutStack/>}
        </>
    )
}
export  default  AuthNavigation