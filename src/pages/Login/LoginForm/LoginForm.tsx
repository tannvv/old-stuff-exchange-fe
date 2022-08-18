import classNames from 'classnames/bind';
import { CgArrowsExchange } from 'react-icons/cg';

import styles from './LoginForm.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const LoginForm = () => {
    return (
        <div className={cx('wrapper', 'lg:w-2/3 lg:h-5/6')}>
            <div className={cx('header')}>
                <img src={images.logo} alt="logo" className={cx('logo')} />
                <p className={cx('name')}>OLD STUFF EXCHANGE</p>
            </div>
            <div className="content">
                <p className={cx('welcome')}>Welcome back!!!</p>
                <p className={cx('sign-in')}>Sign in</p>
                <form action="" className={cx('cover-form')} spellCheck="false">
                    <div className={cx('form-control')}>
                        <p className={cx('label')}>Email</p>
                        <input type="text" name="email" className={cx('input')} />
                    </div>
                    <div className={cx('form-control')}>
                        <div className={cx('password')}>
                            <p className={cx('label')}>Password</p>
                            <p className={cx('forgot-password')}>Forgot Password?</p>
                        </div>
                        <input type="text" name="password" className={cx('input')} />
                    </div>
                    <div className={cx('btn-submit')}>
                        <button className={cx('btn-sign-in')}>
                            SIGN IN
                            <span>
                                <CgArrowsExchange />
                            </span>
                        </button>
                    </div>
                </form>
                <div className={cx('cover-sign-up')}>
                    <span className={cx('account-title')}>I don't have an account ?</span>
                    <span className={cx('sign-up')}>Sign up</span>
                </div>
                <div className={cx('social-network')}>
                    <p className={cx('or')}>or</p>
                    <p className={cx('connect')}>connect with</p>
                    <div className={cx('btn-social')}>
                        <button className={cx('gmail')}>
                            <img src={images.gmail} alt="gmail" className={cx('img-btn')} />
                            Gmail
                        </button>
                        <button className={cx('facebook')}>
                            <img src={images.facebook} alt="facebook" className={cx('img-btn')} />
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
