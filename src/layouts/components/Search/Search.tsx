import HeadlessTippy from '@tippyjs/react/headless';
import { LegacyRef, memo, MutableRefObject, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

import classNames from 'classnames/bind';
import { AccountItem } from '~/components/AccountItem';
import { Popper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isShowResult, setIsShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setIsLoading(true);
            setIsLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef?.current?.focus();
    };
    const handleHideResult = () => {
        setIsShowResult(false);
    };
    const handleChange = (e: any) => {
        const searchValue = e.target.value || '';
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive={true}
                visible={isShowResult && searchResult.length > 0}
                render={(attrs: any) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Popper>
                            <>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                {searchResult.map((account: any) => {
                                    return <AccountItem key={account.id} data={account} />;
                                })}
                            </>
                        </Popper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef as LegacyRef<HTMLInputElement>}
                        value={searchValue}
                        placeholder="Search  accounts"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setIsShowResult(true)}
                    />
                    {!!searchValue && !isLoading && (
                        <button className={cx('clear')} onClick={handleClear} aria-label="clear">
                            <MdClear />
                        </button>
                    )}
                    {isLoading && <FaSpinner className={cx('loading')} />}
                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="search-btn"
                    >
                        <AiOutlineSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(Search);
