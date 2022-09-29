import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';

import styles from './VerifyAddressForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { CgArrowsExchange } from 'react-icons/cg';
import { selectStylesPrimary } from '~/utils/selectStyles';
import { useLoading } from '~/context/LoadingContext';
import { useToast } from '~/context/ToastContext';
import { apartmentApi, buildingApi, userApi } from '~/api';
import { useAuth } from '~/context/AuthContext';
import { User } from '~/context/models';

const cx = classNames.bind(styles);

const VerifyAddressForm = () => {
    const { enableLoading, disableLoading } = useLoading()!;
    const { showError, showSuccess } = useToast()!;
    const { user, setUser } = useAuth()!;
    const navigate = useNavigate();

    const [selectedApartment, setSelectedApartment] = useState();
    const [selectedBuilding, setSelectedBuilding] = useState();
    const [apartmentOptions, setApartmentOptions] = useState([]);
    const [buildingOptions, setBuildingOptions] = useState([]);
    const [isDisabledBuilding, setDisableBuilding] = useState(false);

    const selectStyle = selectStylesPrimary;
    const handleApartmentChange = (e: any) => {
        setSelectedApartment(e.value);
        setDisableBuilding(true);
        buildingApi
            .getList({ apartmentId: e.value })
            .then((response) => {
                const buildings = response.data?.map((bu: any) => ({
                    value: bu.id,
                    label: bu.name,
                }));
                setBuildingOptions(buildings);
                setDisableBuilding(false);
            })
            .catch((error) => {
                showError({ detail: error ?? 'Loading apartment failed' });
                setDisableBuilding(false);
            });
    };
    const handleBuildingChange = (e: any) => {
        setSelectedBuilding(e.value);
    };
    const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const userId = user?.id;
        if (userId && selectedBuilding) {
            userApi
                .address({ userId: userId, buildingId: selectedBuilding })
                .then((response) => {
                    const newUser = new User(response.data);
                    showSuccess({ detail: `Update address success :${newUser.building?.name}` });
                    setUser(newUser);
                    navigate(config.routes.profile);
                })
                .catch((error) => {
                    showError({ detail: error ?? 'Update failed' });
                });
        }
    };

    useEffect(() => {
        enableLoading();
        apartmentApi
            .getAll({ isBuildingsNull: false })
            .then((response) => {
                const apartments = response.data?.map((ap: any) => ({
                    value: ap.id,
                    label: ap.name,
                }));
                setApartmentOptions(apartments);
                disableLoading();
            })
            .catch((error) => {
                showError({ detail: error ?? 'Loading apartment failed' });
                disableLoading();
            });
    }, []);
    return (
        <div className={cx('wrapper', 'lg:w-2/3 lg:h-5/6')}>
            <div className="content">
                <p className={cx('welcome')}>Welcome back!!!</p>
                <p className={cx('sign-in')}>Verify your location</p>
                <form action="" className={cx('cover-form')} spellCheck="false">
                    <div className={cx('form-control')}>
                        <label htmlFor="apartment-select" className={cx('label')}>
                            Apartment
                        </label>
                        <Select
                            name="apartment"
                            id="apartment-select"
                            options={apartmentOptions}
                            className={cx('select')}
                            styles={selectStyle}
                            onChange={handleApartmentChange}
                        />
                    </div>
                    <div className={cx('form-control')}>
                        <div className={cx('password')}>
                            <label htmlFor="building-select" className={cx('label')}>
                                Building
                            </label>
                        </div>
                        <Select
                            name="building"
                            id="building-select"
                            options={buildingOptions}
                            className={cx('select')}
                            styles={selectStyle}
                            onChange={handleBuildingChange}
                            isDisabled={isDisabledBuilding}
                        />
                    </div>
                    <div className={cx('btn-submit')}>
                        <button className={cx('btn-verify')} onClick={handleVerify} type="submit">
                            Confirm
                            <span>
                                <CgArrowsExchange />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyAddressForm;
