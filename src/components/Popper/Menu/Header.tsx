import ClassNames from 'classnames/bind';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import styles from './Menu.module.scss';

interface Props {
    title: string;
    onBack: () => void;
}
const cx = ClassNames.bind(styles);
function Header({ title, onBack }: Props) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <AiOutlineArrowLeft />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;
