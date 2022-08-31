import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);
interface Props {
    children: ReactNode;
}
const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner', 'container')}>
                <div className={cx('sidebar', 'hidden lg:block')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
