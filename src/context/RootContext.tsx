import React from 'react';
import AuthorizeProvider from './AuthContext';
import LoadingContextProvider from './LoadingContext';

interface Props {
    children: JSX.Element;
}
const RootContext = ({ children }: Props) => {
    return (
        <LoadingContextProvider>
            <AuthorizeProvider>{children}</AuthorizeProvider>
        </LoadingContextProvider>
    );
};

export default RootContext;
