import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
import images from '~/assets/images';

interface Props {
    className?: string;
}
const cx = classNames.bind(styles);
const Loading = ({ className }: Props) => {
    return (
        <div
            className={cx('overlay', {
                [className as string]: className,
            })}
        >
            <img src={images.loading} alt="loading" className={cx('img')} />
        </div>
    );
};

export default Loading;
