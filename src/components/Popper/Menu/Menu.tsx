import Tippy from '@tippyjs/react/headless';
import ClassNames from 'classnames/bind';
import { useState } from 'react';

import { Popper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

interface Props {
    children: JSX.Element;
    items?: any[];
    hideOnClick?: boolean;
    onChange: any;
}
const cx = ClassNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }: Props) {
    const [history, setHistory] = useState([{ data: items }]);
    const current: any = history[history.length - 1];
    const renderItem = () => {
        return current?.data?.map((item: any, index: number) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item?.children]);
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
            <PopperWrapper className={cx('menu-popper')}>
                <>
                    {history.length > 1 && (
                        <Header
                            title={current.title}
                            onBack={() => {
                                setHistory((prev) => prev.slice(0, prev.length - 1));
                            }}
                        />
                    )}
                    <div className={cx('menu-body')}>{renderItem()}</div>
                </>
            </PopperWrapper>
        </div>
    );

    const handleResetToFirstPage = () => setHistory((prev) => prev.slice(0, 1));
    return (
        <Tippy
            interactive={true}
            offset={[12, 8]}
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={handleResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}
export default Menu;
