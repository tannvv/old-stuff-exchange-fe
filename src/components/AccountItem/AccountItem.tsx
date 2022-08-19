import { BsCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import ClassNames from 'classnames/bind';
import Image from '../Image';
import styles from './AccountItem.module.scss';

const cx = ClassNames.bind(styles);
function AccountItem({ data }: any) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    {data.full_name}
                    <span>{data.tick && <BsCheckCircleFill className={cx('check-icon')} />}</span>
                </p>
                <span className={cx('user-name')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
