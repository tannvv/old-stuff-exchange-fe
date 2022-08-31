import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';

import IMenuItem from '~/interfaces/IMenuItem';
import Popper from '../Popper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

interface Props {
    items?: IMenuItem[];
    children: JSX.Element;
    onChange?: (item?: IMenuItem) => void;
    hideOnClick?: boolean;
}
const defaultFn = (item?: IMenuItem) => {};
const cx = classNames.bind(styles);
const Menu = ({ items, children, hideOnClick = false, onChange = defaultFn }: Props) => {
    const [history, setHistory] = useState([{ data: items } as IMenuItem]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current?.data?.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children as IMenuItem]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    const handleResult = (attrs: any) => (
        <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
            <Popper className={cx('menu-popper')}>
                <>
                    {history.length > 1 && (
                        <Header
                            title={current.title ?? ''}
                            onBack={() => {
                                setHistory((prev) => prev.slice(0, prev.length - 1));
                            }}
                        />
                    )}
                    <div className={cx('menu-body')}>{renderItem()}</div>
                </>
            </Popper>
        </div>
    );
    const handleResetToFirstPage = () => setHistory((prev) => prev.slice(0, 1));

    return (
        <TippyHeadLess
            interactive={true}
            hideOnClick={hideOnClick}
            offset={[12, 8]}
            delay={[0, 700]}
            placement="bottom-end"
            render={handleResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </TippyHeadLess>
    );
};

export default Menu;
