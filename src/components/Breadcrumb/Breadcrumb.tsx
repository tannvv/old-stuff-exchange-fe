import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import { BreadCrumb as BreadCrumbPrime } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';

import styles from './Breadcrumb.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const BreadCrumb = () => {
    const navigate = useNavigate();
    const items: MenuItem[] = [{ label: 'Create post', url: '/create-post' }];

    const home: MenuItem = { icon: 'pi pi-home', url: '/' };
    const handleClick = (e: any) => {
        e.preventDefault();
        const to = items.find((item) => item.label === e.target.innerText)?.url;
        navigate(to ?? '/');
    };

    return (
        <div>
            <div className={cx('wrapper')}>
                <BreadCrumbPrime model={items} home={home} className={cx('breadcrumb')} onClick={handleClick} />
            </div>
        </div>
    );
};

export default BreadCrumb;
