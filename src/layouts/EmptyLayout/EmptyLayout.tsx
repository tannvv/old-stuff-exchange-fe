import classNames from 'classnames/bind';
import styles from './EmptyLayout.module.scss';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);
interface Props {
    children: ReactNode;
    className?: string;
}
const DefaultLayout: React.FC<Props> = ({ children, className }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('content', {
                    [className as string]: className,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;
