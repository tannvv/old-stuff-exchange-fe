import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import styles from './Popper.module.scss';

interface Props {
    className?: string;
    children: ReactElement;
}
const cx = classNames.bind(styles);
function Popper({ children, className }: Props) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Popper;
