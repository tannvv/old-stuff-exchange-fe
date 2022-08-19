import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import images from '~/assets/images';
import LoginForm from './LoginForm';

const cx = classNames.bind(styles);
const Login = () => {
    return (
        <div className="bg-[#3F3D56] h-screen w-screen md:px-[16%] md:py-[10%] lg:px-[14%] lg:py-[1%] overflow-y-auto">
            <div className={cx('wrapper', 'grid lg:grid-cols-5')}>
                <div
                    className={cx('form-cover', 'rounded-3xl bg-white lg:col-span-3 lg:rounded-none lg:rounded-l-3xl')}
                >
                    <LoginForm />
                </div>
                <div className={cx('bg-cover', 'bg-primary hidden lg:block lg:col-span-2 lg:rounded-r-3xl')}></div>
                <img src={images.bgLogin} alt="bg-img" className={cx('img', 'hidden lg:block')} />
            </div>
        </div>
    );
};

export default Login;
