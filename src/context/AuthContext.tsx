import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithRedirect,
    signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { User as UserFirebase } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { authorizeApi } from '~/api';
import config from '~/config';
import { User } from '~/context/models';
import { auth } from '~/firebase';
import { useLoading } from './LoadingContext';

interface AuthValue {
    googleSignIn: () => Promise<void>;
    facebookSignIn: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
    currentRole: string;
    isAuth: boolean;
    user: User | null;
}
interface Props {
    children: JSX.Element;
}

const AuthContext = createContext<AuthValue | null>(null);
const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const { enableLoading, disableLoading } = useLoading()!;
    const [currentRole, setCurrentRole] = useState('');
    const [isAuth, setAuth] = useState(false);
    const navigate = useNavigate();
    const isExistedUser = useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser: UserFirebase | null) => {
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
                            setAuth(true);
                            setCurrentRole(userObj.role?.name ?? '');
                            if (userObj?.building) {
                                navigate(config.routes.profile);
                            } else {
                                navigate(config.routes.verifyAddress);
                            }
                        }
                    } else {
                        isExistedUser.current = false;
                        setUser(null);
                        setAuth(false);
                        setCurrentRole('');
                        navigate(config.routes.home);
                    }
                    disableLoading();
                }
            },
            (error) => {
                disableLoading();
            },
        );
        return () => unsubscribe();
    }, [disableLoading, enableLoading, navigate, user]);

    const facebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        enableLoading();
        signInWithRedirect(auth, provider);
    };
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        enableLoading();
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, facebookSignIn, user, currentRole, isAuth, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};
