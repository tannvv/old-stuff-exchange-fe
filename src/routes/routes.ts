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
import { VerifyAddress } from '~/pages/VerifyAddress';
import { PermissionDenied } from '~/pages/PermissionDenied';
import RoleBasedGuard from '~/guards/RoleBasedGuard';
import { RoleName } from '~/config/constants';
import { Chat } from '~/pages/Chat';
import { CreatePost } from '~/pages/Post/CreatePost';
import { MyPost } from '~/pages/Post/MyPost';
import { BoughtPost } from '~/pages/Post/BoughtPost';
import { DetailPost } from '~/pages/Post/DetailPost';

const publicRoutes: Route[] = [
    {
        path: config.routes.home,
        component: Home,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
    },
    {
        path: config.routes.chat,
        component: Chat,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
    },
    {
        path: config.routes.login,
        component: Login,
        layout: HeaderOnly,
        className: 'bg-[#46435f]',
    },
    {
        path: config.routes.signUp,
        component: SignUp,
        layout: HeaderOnly,
        className: 'bg-[#46435f]',
    },
    {
        path: config.routes.verifyAddress,
        component: VerifyAddress,
        layout: HeaderOnly,
        className: 'bg-[#46435f]',
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
        accessibleRole: [RoleName.RESIDENT],
    },
    {
        path: config.routes.posts,
        component: MyPost,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
        accessibleRole: [RoleName.RESIDENT],
    },
    {
        path: config.routes.postsBuy,
        component: BoughtPost,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
        accessibleRole: [RoleName.RESIDENT],
    },
    {
        path: config.routes.detailPost,
        component: DetailPost,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
        accessibleRole: [RoleName.RESIDENT],
    },
    {
        path: config.routes.createPost,
        component: CreatePost,
        layout: HeaderOnly,
        className: 'bg-[#F5F5F5]',
        accessibleRole: [RoleName.RESIDENT],
    },
    {
        path: config.routes.permissionDenied,
        component: PermissionDenied,
        layout: EmptyLayout,
    },
    {
        path: config.routes.notFound,
        component: NotFound,
        layout: EmptyLayout,
    },
];
const privateRoutes = [{}];
export { publicRoutes, privateRoutes };
