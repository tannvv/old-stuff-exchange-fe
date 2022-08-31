import { createContext, useContext, useState } from 'react';
import Loading from '~/components/Loading';

interface LoadingValue {
    enableLoading: () => void;
    disableLoading: () => void;
}
interface Props {
    children: JSX.Element;
}
const LoadingContext = createContext<LoadingValue | null>(null);

const LoadingContextProvider = ({ children }: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    return (
        <LoadingContext.Provider value={{ enableLoading, disableLoading }}>
            {children}
            <Loading isShow={isLoading} />
        </LoadingContext.Provider>
    );
};

export default LoadingContextProvider;
export const useLoading = () => {
    return useContext(LoadingContext);
};
