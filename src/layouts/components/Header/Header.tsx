import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { AiOutlineUpload, AiOutlineCloudUpload, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { RiCoinLine } from 'react-icons/ri';
import { BsGear } from 'react-icons/bs';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';

import { MENU_ITEMS as menuItems } from './menuItem';
import { Button } from '~/components/Button';
import { Menu } from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
const MENU_ITEMS = menuItems;

function Header() {
    const currentUser = false;
    const inboxNumber = 2;

    const handleMenuChange = (e: any) => {
        console.log(e);
    };

    const userMenu = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: '/@tannv',
        },
        {
            icon: <RiCoinLine />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <BsGear />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <AiOutlineLogout />,
            title: 'Log out',
            to: '/signOut',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', 'container')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <Image src={images.logo} alt="TikTok" className={cx('logo-img')} />
                    <div className={cx('app-name')}>OLD STUFF EXCHANGE</div>
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" delay={100}>
                                <button className={cx('action-btn')}>
                                    <AiOutlineUpload />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" delay={100}>
                                <button className={cx('action-btn')}>
                                    <AiOutlineCloudUpload />
                                    <span className={cx('number-inbox')}>{inboxNumber}</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button outline>Sign in</Button>
                            <Button outline>Sign up</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        <>
                            {currentUser ? (
                                <Image
                                    src="https://lh3.googleusercontent.com/ogw/AOh-ky1YV1CzT3Rk3mL5Qu_YvE9jUi7vtQNtNVy99ja_=s32-c-mo"
                                    alt="TanNV"
                                    className={cx('user-avatar')}
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <IoEllipsisVerticalSharp />
                                </button>
                            )}
                        </>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
