import classNames from 'classnames/bind';
import { CgArrowsExchange } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import styles from './LoginForm.module.scss';
import images from '~/assets/images';
import config from '~/config';
import { UserAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const LoginForm = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate(config.routes.profile);
        }
    }, [user, navigate]);

    return (
        <div className={cx('wrapper', 'lg:w-2/3 lg:h-5/6')}>
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
                    <span className={cx('sign-up')}>
                        <Link to={config.routes.signUp}>Sign up</Link>
                    </span>
                </div>
                <div className={cx('social-network')}>
                    <p className={cx('or')}>or</p>
                    <p className={cx('connect')}>connect with</p>
                    <div className={cx('btn-social')}>
                        <button className={cx('gmail')} onClick={handleGoogleSignIn}>
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
