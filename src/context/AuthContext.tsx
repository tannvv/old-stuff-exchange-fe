import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

import { auth } from '~/firebase';
import { UserFirebase } from './models';

interface AuthValue {
    googleSignIn: () => void;
    logOut: () => void;
    user: UserFirebase | null;
}
interface Props {
    children: JSX.Element;
}

const AuthContext = createContext(null);
const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState({} as UserFirebase | null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
            if (currentUser) {
                const { displayName, email, photoURL } = currentUser;
                const user = new UserFirebase(displayName, email, photoURL);
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    return <AuthContext.Provider value={{ googleSignIn, logOut, user } as any}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const UserAuth: any = () => {
    return useContext(AuthContext);
};
