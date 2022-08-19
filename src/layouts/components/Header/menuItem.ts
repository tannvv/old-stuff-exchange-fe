import { IconType } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
import { GrLanguage } from 'react-icons/gr';

export interface MenuItem {
    icon?: IconType;
    title: string;
    code?: string;
    to?: string;
    children?: object;
    data?: any[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        icon: GrLanguage,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                    children: {
                        title: 'English',
                        data: [
                            {
                                code: 'unitedState',
                                title: 'United state',
                            },
                            {
                                code: 'unitedKingdom',
                                title: 'United kingdom',
                            },
                        ],
                    },
                },
                {
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    code: 'cn',
                    title: 'Chinese',
                },
            ],
        },
    },
    {
        icon: CgProfile,
        title: 'Profile',
        to: '/profile',
    },
];
