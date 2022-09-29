import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUpload, AiOutlineCloudUpload, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { RiCoinLine } from 'react-icons/ri';
import { BsGear, BsFilePostFill } from 'react-icons/bs';
import { GiBuyCard } from 'react-icons/gi';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Search from '../Search';

import { MENU_ITEMS, MENU_ITEMS_ANONYMOUS } from './menuItem';
import { Button } from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import IMenuItem from '~/interfaces/IMenuItem';
import { useAuth } from '~/context/AuthContext';

interface Props {
    className?: string;
}
const cx = classNames.bind(styles);
function Header({ className }: Props): JSX.Element {
    const inboxNumber = 2;
    const location = useLocation();
    const { logOut, user } = useAuth()!;

    const handleMenuChange = (item?: IMenuItem) => {
        if (item?.onClick) {
            item.onClick();
        }
    };

    const userMenu: IMenuItem[] = [
        {
            icon: BsFilePostFill,
            title: 'Post sale',
            to: config.routes.posts,
        },
        {
            icon: GiBuyCard,
            title: 'Post buy',
            to: config.routes.postsBuy,
        },
        ...MENU_ITEMS,
        {
            icon: AiOutlineLogout,
            title: 'Log out',
            onClick: logOut,
            separate: true,
        },
    ];
    return (
        <header
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('inner', 'container')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <Image src={images.logo} alt="TikTok" className={cx('logo-img')} />
                    <div className={cx('app-name', 'hidden lg:block')}>OLD STUFF EXCHANGE</div>
                </Link>
                <div className={cx('', 'w-[74%] md:w-[361px] lg:w-[400px] xl:w-[500px]')}>
                    <Search />
                </div>
                <div className={cx('actions', 'ml-[0]')}>
                    {user ? (
                        <>
                            <div className="hidden lg:flex">
                                <Tippy content="Create post" delay={100}>
                                    <Link className={cx('action-btn')} aria-label="action-btn" to={'/create-post'}>
                                        <AiOutlineUpload />
                                    </Link>
                                </Tippy>
                                <Tippy content="Inbox" delay={100} interactive={true}>
                                    <Link className={cx('action-btn')} to={'/chat'}>
                                        <AiOutlineCloudUpload />
                                        <span className={cx('number-inbox')}>{inboxNumber}</span>
                                    </Link>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('', 'hidden lg:block')}>
                                <Button outline to={'/login'} location={location}>
                                    Sign in
                                </Button>
                                <Button outline to={'/signUp'} location={location}>
                                    Sign up
                                </Button>
                            </div>
                        </>
                    )}
                    {user ? (
                        <Menu items={userMenu} onChange={handleMenuChange} key={'user-menu'}>
                            <Image src={user.imageUrl} alt={user.fullName} className={cx('user-avatar')} />
                        </Menu>
                    ) : (
                        <Menu items={MENU_ITEMS_ANONYMOUS} onChange={handleMenuChange} key={'anonymous-menu'}>
                            <button className={cx('more-btn', 'lg:hidden')} aria-label="more-btn">
                                <IoEllipsisVerticalSharp />
                            </button>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
