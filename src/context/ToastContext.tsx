import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface ToastProps {
    summary?: string;
    detail?: string;
}
interface ToastProviderValue {
    showSuccess: (param: ToastProps) => void;
    showInfo: (params: ToastProps) => void;
    showWarn: (params: ToastProps) => void;
    showError: (params: ToastProps) => void;
    clear: () => void;
}
interface Props {
    children: JSX.Element;
}
const ToastContext = createContext<ToastProviderValue | null>(null);

const ToastContextProvider = ({ children }: Props) => {
    const toast = useRef<any>();

    const showSuccess = (params: ToastProps) => {
        toast.current.show({
            severity: 'success',
            summary: params.summary ?? 'Success Message',
            detail: params.detail ?? 'Action successfully',
            life: 3000,
        });
    };

    const showInfo = (params: ToastProps) => {
        toast.current.show({
            severity: 'info',
            summary: params.summary ?? 'Info Message',
            detail: params.detail ?? 'Message Content',
            life: 3000,
        });
    };

    const showWarn = (params: ToastProps) => {
        toast.current.show({
            severity: 'warn',
            summary: params.summary ?? 'Warn Message',
            detail: params.detail ?? 'Message Content',
            life: 3000,
        });
    };

    const showError = (params: ToastProps) => {
        toast.current.show({
            severity: 'error',
            summary: params.summary ?? 'Error Message',
            detail: params.detail ?? 'Message Content',
            life: 3000,
        });
    };

    const clear = () => {
        toast.current.clear();
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showInfo, showWarn, showError, clear }}>
            {children}
            <Toast ref={toast} className="text-lg w-[300px] md:text-xl md:w-[400px] md:leading-loose" />
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
export const useToast = () => {
    return useContext(ToastContext);
};
