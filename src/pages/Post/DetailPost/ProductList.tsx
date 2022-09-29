import React from 'react';
import classNames from 'classnames/bind';

import styles from './DetailPost.module.scss';

import { Product } from '~/context/models';
import ProductItem from './ProductItem';

interface Props {
    products: Product[];
}
const cx = classNames.bind(styles);

const ProductList = ({ products }: Props) => {
    return (
        <>
            {products.map((po) => {
                return <ProductItem product={po} key={po.id} />;
            })}
        </>
    );
};

export default ProductList;
