import classNames from 'classnames';
import { forwardRef, useState } from 'react';

import styles from './Image.module.scss';
import images from '~/assets/images';

interface Props {
    src?: string;
    alt?: string;
    className?: string;
    fallback?: any;
    passProps?: any;
}
const Image = forwardRef<any, Props>(
    ({ src, alt, className, fallback: customFallback = images.noImage, ...passProps }: Props, ref) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                alt={alt}
                src={fallback || src}
                {...passProps}
                ref={ref}
                onError={handleError}
            />
        );
    },
);

export default Image;
