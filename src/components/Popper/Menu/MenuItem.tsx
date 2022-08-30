import classNames from 'classnames/bind';
import { Button } from '~/components/Button';
import IMenuItem from '~/interfaces/IMenuItem';

import styles from './Menu.module.scss';

interface Props {
    data: IMenuItem;
    onClick?: () => void;
}
const cx = classNames.bind(styles);
const MenuItem = ({ data, onClick }: Props) => {
    const classes = cx('menu-item', 'tannv', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
};

export default MenuItem;
