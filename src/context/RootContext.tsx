import React from 'react';
import AuthorizeProvider from './AuthContext';
import LoadingContextProvider from './LoadingContext';
import ToastContextProvider from './ToastContext';

interface Props {
    children: JSX.Element;
}
const RootContext = ({ children }: Props) => {
    return (
        <LoadingContextProvider>
            <ToastContextProvider>
                <AuthorizeProvider>{children}</AuthorizeProvider>
            </ToastContextProvider>
        </LoadingContextProvider>
    );
};

export default RootContext;
