import { CgProfile } from 'react-icons/cg';
import { GrLanguage } from 'react-icons/gr';
import { VscSignIn } from 'react-icons/vsc';
import { IoCreateOutline } from 'react-icons/io5';
import IMenuItem from '~/interfaces/IMenuItem';

export const MENU_ITEMS: IMenuItem[] = [
    // {
    //     icon: GrLanguage,
    //     title: 'Language',
    //     children: {
    //         title: 'Language',
    //         data: [
    //             {
    //                 code: 'en',
    //                 title: 'English',
    //                 children: {
    //                     title: 'English',
    //                     data: [
    //                         {
    //                             code: 'unitedState',
    //                             title: 'United state',
    //                         },
    //                         {
    //                             code: 'unitedKingdom',
    //                             title: 'United kingdom',
    //                         },
    //                     ],
    //                 },
    //             },
    //             {
    //                 code: 'vi',
    //                 title: 'Vietnamese',
    //             },
    //             {
    //                 code: 'cn',
    //                 title: 'Chinese',
    //             },
    //         ],
    //     },
    // },
    {
        icon: CgProfile,
        title: 'Profile',
        to: '/profile',
    },
];

export const MENU_ITEMS_ANONYMOUS: IMenuItem[] = [
    {
        icon: VscSignIn,
        title: 'Sign in',
        to: '/login',
    },
    {
        icon: IoCreateOutline,
        title: 'Sign up',
        to: '/signUp',
    },
];
