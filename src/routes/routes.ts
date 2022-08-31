import { DefaultLayout } from '~/layouts/DefaultLayout';
import config from '~/config';

import { Home } from '~/pages/Home';
import Login from '~/pages/Login';
import { Route } from './interface';
import SignUp from '~/pages/SignUp';
import HeaderOnly from '~/layouts/HeaderOnly';
import Profile from '~/pages/Profile';
import NotFound from '~/pages/NotFound';
import EmptyLayout from '~/layouts/EmptyLayout';

const publicRoutes: Route[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: HeaderOnly,
    },
    {
        path: config.routes.signUp,
        component: SignUp,
        layout: HeaderOnly,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: HeaderOnly,
        className: 'bg-white',
    },
    {
        path: config.routes.notFound,
        component: NotFound,
        layout: EmptyLayout,
    },
];
const privateRoutes = [{}];
export { publicRoutes, privateRoutes };
