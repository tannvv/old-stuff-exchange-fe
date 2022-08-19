import { DefaultLayout } from '~/layouts/DefaultLayout';
import config from '~/config';

import { Home } from '~/pages/Home';
import Login from '~/pages/Login';
import { Route } from './interface';

const publicRoutes: Route[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: null,
    },
];
const privateRoutes = [{}];
export { publicRoutes, privateRoutes };
