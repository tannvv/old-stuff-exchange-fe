import ClassNames from 'classnames/bind';
import { Button } from '~/components/Button';

import styles from './Menu.module.scss';

interface Props {
    data: any;
    onClick: () => void;
}
const cx = ClassNames.bind(styles);
function MenuItem({ data, onClick }: Props) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        // <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
        //     {data.title}
        // </Button>
        <button className={classes} onClick={onClick}>
            {data.title}
        </button>
    );
}

export default MenuItem;
