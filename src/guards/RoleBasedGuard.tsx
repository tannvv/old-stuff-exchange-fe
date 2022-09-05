import React from 'react';
import { Navigate } from 'react-router-dom';
import config from '~/config';

import { useAuth } from '~/context/AuthContext';

interface Props {
    children: JSX.Element;
    accessibleRole?: string[];
}
const RoleBasedGuard: React.FC<Props> = ({ children, accessibleRole = [] }: Props) => {
    const { currentRole } = useAuth()!;
    if (accessibleRole.length > 0 && !accessibleRole.includes(currentRole)) {
        return <Navigate to={config.routes.permissionDenied} />;
    }
    return children;
};

export default RoleBasedGuard;
