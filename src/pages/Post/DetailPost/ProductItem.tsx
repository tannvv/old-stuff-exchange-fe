import classNames from 'classnames/bind';

import styles from './DetailPost.module.scss';

import { Product } from '~/context/models';

interface Props {
    product: Product;
}
const cx = classNames.bind(styles);
const ProductItem = ({ product }: Props) => {
    return (
        <div className={cx('product-item')}>
            <div className={cx('info')}>
                <p className={cx('name')}>{product.name}</p>
                <p className={cx('description')}>{product.description}</p>
                <p className={cx('price')}>
                    <span className={cx('label')}>Price: </span>
                    <span className={cx('value')}>{product.price}</span>
                </p>
                <p className={cx('category')}>
                    <span className={cx('label')}>Category: </span>
                    <span className={cx('value')}>{product.category?.name}</span>
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
