import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';
import jwt from 'jwt-decode';

import { User as UserFirebase } from 'firebase/auth';

import { auth } from '~/firebase';
import { User } from '~/context/models';
import { authorizeApi, userApi } from '~/api';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useLoading } from './LoadingContext';

interface AuthValue {
    googleSignIn: () => void;
    facebookSignIn: () => void;
    logOut: () => void;
    user: User | null;
}
interface Props {
    children: JSX.Element;
}

const AuthContext = createContext<AuthValue | null>(null);
const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const { enableLoading, disableLoading } = useLoading()!;
    const navigate = useNavigate();
    const isExistedUser = useRef(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser: UserFirebase | null) => {
            if (isExistedUser.current !== !!currentUser) {
                enableLoading();
                if (currentUser) {
                    isExistedUser.current = true;
                    const firebaseToken = await currentUser.getIdToken();
                    const response = await authorizeApi.firebase({ token: firebaseToken });
                    const beToken = response?.data?.token;
                    const userData = response?.data?.user;
                    if (beToken && userData) {
                        localStorage.setItem('token', beToken ?? '');
                        const userObj = new User(userData);
                        setUser(userObj);
                        navigate(config.routes.profile);
                    }
                } else {
                    isExistedUser.current = false;
                    setUser(null);
                    navigate(config.routes.home);
                }
                disableLoading();
            }
        });
        return () => unsubscribe();
    }, [disableLoading, enableLoading, navigate, user]);

    const facebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        enableLoading();
        await signInWithRedirect(auth, provider);
    };
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        enableLoading();
        await signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, facebookSignIn, user }}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};
