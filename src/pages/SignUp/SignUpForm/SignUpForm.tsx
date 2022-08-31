import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SignUpForm.module.scss';
import { Popper } from '~/components/Popper';
import images from '~/assets/images';
import { CgArrowsExchange } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
const SignUpForm = (): JSX.Element => {
    const [isLoading, setLoading] = useState(false);
    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    return (
        <Popper className={cx('wrapper', 'h-full lg:w-screen lg:px-[40px] lg:py-[40px]')}>
            <div className={cx('content')}>
                <p className={cx('welcome')}>Hello guys!!!</p>
                <p className={cx('sign-in')}>Sign up with me !!!</p>
                <p className={cx('have-account')}>
                    Already have an account?
                    <Link to={'/login'} className={cx('sign-in-here')}>
                        Sign in here
                    </Link>
                </p>
                <form action="" className={cx('cover-form')} spellCheck="false">
                    <div className={cx('separate-form', 'lg:flex lg:justify-between')}>
                        <div className={cx('inner-form', 'lg:w-[46%]')}>
                            <div className={cx('form-control')}>
                                <label htmlFor="username-input" className={cx('label')}>
                                    User name
                                </label>
                                <input id="username-input" type="text" name="email" className={cx('input')} />
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="apartment-input" className={cx('label')}>
                                    Apartment
                                </label>
                                <input id="apartment-input" type="text" name="apartment" className={cx('input')} />
                            </div>
                            <div className={cx('form-control')}>
                                <label htmlFor="building-input" className={cx('label')}>
                                    Building
                                </label>
                                <input id="building-input" type="text" name="building" className={cx('input')} />
                            </div>
                        </div>
                        <div className={cx('inner-form', 'lg:w-[46%]')}>
                            <div className={cx('form-control')}>
                                <label htmlFor="phone-input" className={cx('label')}>
                                    Phone
                                </label>
                                <input id="phone-input" type="text" name="email" className={cx('input')} />
                            </div>

                            <div className={cx('form-control')}>
                                <div className={cx('password')}>
                                    <label htmlFor="password-input" className={cx('label')}>
                                        Password
                                    </label>
                                </div>
                                <input id="password-input" type="password" name="password" className={cx('input')} />
                            </div>
                            <div className={cx('form-control')}>
                                <div className={cx('password')}>
                                    <label htmlFor="re-password-input" className={cx('label')}>
                                        Re-password
                                    </label>
                                </div>
                                <input
                                    id="re-password-input"
                                    type="password"
                                    name="rePassword"
                                    className={cx('input')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-submit')}>
                        <button className={cx('btn-sign-in')} onClick={handleSignUp}>
                            SIGN UP
                            <span>
                                <CgArrowsExchange />
                            </span>
                        </button>
                    </div>
                </form>
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
                <Loading isShow={isLoading} />
            </div>
        </Popper>
    );
};

export default SignUpForm;
