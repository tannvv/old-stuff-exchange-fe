import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Select, { StylesConfig } from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './PostFilter.module.scss';
import { selectStyles } from '~/utils/selectStyles';
import { userApi, categoryApi } from '~/api';
import { useDebounce } from '~/hooks';
import { SuggestChat } from '~/components/SuggestChat';
import { useAuth } from '~/context/AuthContext';
import { User } from '~/context/models';

interface Props {
    className?: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
    onRefresh: () => void;
}
const cx = classNames.bind(styles);

const PostFilter = ({ className, setCategoryValue, setSearchValue, onRefresh }: Props) => {
    const [searchValue, setSearch] = useState('');
    const [options, setOptions] = useState([]);
    const [usersChat, setUsersChat] = useState<User[]>([]);

    const { user } = useAuth()!;
    const debounceValue = useDebounce(searchValue, 500);
    const colorStyles: StylesConfig = selectStyles;

    useEffect(() => {
        categoryApi.getAll().then((response) => {
            const categories = response?.data?.map((category: any) => ({
                value: category.id,
                label: category.name,
            }));
            setOptions(categories);
        });

        if (user) {
            userApi
                .getList({ apartmentId: user.building?.apartmentId, pageNumber: 1, pageSize: 100 })
                .then((response) => {
                    let usersData: User[] = response.data.map((user: any) => new User(user));
                    usersData = usersData.filter((u) => u.id !== user.id);
                    setUsersChat(usersData);
                });
        }
    }, []);

    useEffect(() => {
        setSearchValue(debounceValue);
    }, [debounceValue]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onRefresh();
    };

    const handleSelect = (e: any) => {
        onRefresh();
        setCategoryValue(e.value);
    };
    return (
        <div
            className={cx('wrapper', {
                [className as string]: className,
            })}
        >
            <div className={cx('content')}>
                <div>
                    <div className={cx('filter')}>
                        <span className={cx('icon')}>
                            <AiOutlineSearch />
                        </span>
                        <input
                            placeholder="Search post"
                            className={cx('input')}
                            spellCheck="false"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                    <Select
                        name="category"
                        id="category"
                        options={options}
                        className={cx('select')}
                        styles={colorStyles}
                        onChange={handleSelect}
                    />
                </div>
                {user && <SuggestChat users={usersChat} className={cx('suggest-accounts')} clickType={'navigate'} />}
                <div className={cx('info')}>
                    <p className={cx('about-us')}>About us</p>
                    <span className={cx('about-content')}>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
                </div>
            </div>
        </div>
    );
};

export default PostFilter;
