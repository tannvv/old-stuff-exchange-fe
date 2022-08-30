import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
import images from '~/assets/images';

interface Props {
    isShow: boolean;
    className?: string;
}
const cx = classNames.bind(styles);
const Loading = ({ isShow, className }: Props) => {
    return (
        <div
            style={{ display: isShow ? 'flex' : 'none' }}
            className={cx('overlay', {
                [className as string]: className,
            })}
        >
            <img src={images.loading} alt="loading" className={cx('img')} />
        </div>
    );
};

export default Loading;
