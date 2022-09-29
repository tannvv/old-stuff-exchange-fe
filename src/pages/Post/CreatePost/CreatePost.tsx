import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
    Field,
    FastField,
    Form,
    Formik,
    FormikHelpers,
    FormikProps,
    FieldArray,
    FieldArrayRenderProps,
    ErrorMessage,
} from 'formik';
import { v4 as uuidV4 } from 'uuid';
import * as Yup from 'yup';
import { BsFillImageFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import moment, { Moment } from 'moment';

import styles from './CreatePost.module.scss';
import { ImagePicker, Input, InputArea, Select } from '~/components/custom-fields';
import config from '~/config';
import { categoryApi, postApi } from '~/api';
import { selectStylesCustomField } from '~/utils/selectStyles';
import { Breadcrumb } from '~/components/Breadcrumb';
import { storage } from '~/firebase';
import { useToast } from '~/context/ToastContext';
import { useLoading } from '~/context/LoadingContext';
import { CreatePostReq, CreateProduct } from '~/api/interfaces';
import { useAuth } from '~/context/AuthContext';

interface PostFormValue {
    id: string;
    title: string;
    description: string;
    imageUrl: FileList | null;
    products: ProductItem[];
}

interface ProductItem {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    postId?: string;
}
const cx = classNames.bind(styles);
function CreatePost() {
    const [options, setOptions] = useState([]);
    const { showSuccess, showError } = useToast()!;
    const { enableLoading, disableLoading } = useLoading()!;
    const { user } = useAuth()!;

    const { messages } = config;
    const initialValue: PostFormValue = {
        id: uuidV4(),
        title: '',
        description: '',
        imageUrl: null,
        products: [{ id: uuidV4(), name: '', description: '', categoryId: '', price: 0 }],
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(messages.isRequired),
        description: Yup.string().required(messages.isRequired),
        imageUrl: Yup.mixed().required(messages.isRequiredImage),
        products: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required(messages.isRequired),
                description: Yup.string().required(messages.isRequired),
                price: Yup.number().moreThan(0, messages.isNumberPositive).required(messages.isRequired),
                categoryId: Yup.string().required(messages.isRequired),
            }),
        ),
    });

    const uploadFiles = async (files: FileList, postId: string): Promise<string> => {
        const promises = [];
        const size = files.length;
        let result: string = '';
        for (let index = 0; index < size; index++) {
            const element = files[index];
            const storageRef = ref(storage, `/posts/${postId}/${element.name}`);
            const uploadTask = uploadBytesResumable(storageRef, element);
            promises.push(uploadTask);
            uploadTask.on('state_changed', (snapshot) => {
                const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
                const _now = moment(new Date()).format(DATE_TIME_FORMAT);
                console.log(`[${_now}] Information: Upload image size bytes : ${snapshot.totalBytes}`);
            });
        }

        await Promise.all(promises)
            .then(async (snapshots) => {
                // get the first image upload to represent post
                result = await getDownloadURL(snapshots[0].ref);
            })
            .catch(() => {
                showError({ detail: 'Upload image failed' });
            });
        return new Promise<string>((resolve) => {
            resolve(result);
        });
    };

    const convertRequest = (values: PostFormValue, imageUrl: string): CreatePostReq | undefined => {
        if (user?.id && imageUrl) {
            const products: CreateProduct[] = [];
            values?.products.forEach((pro) => {
                const product: CreateProduct = {
                    name: pro.name,
                    description: pro.description,
                    price: pro.price,
                    status: 'Còn sài ngon',
                    categoryId: pro.categoryId,
                    postId: values.id,
                };
                products.push(product);
            });

            const dataRequest: CreatePostReq = {
                id: values.id,
                title: values.title,
                description: values.description,
                imageUrl: imageUrl,
                authorId: user?.id,
                products: products,
            };
            return dataRequest;
        }
    };

    const handleSubmit = async (values: PostFormValue, actions: FormikHelpers<PostFormValue>) => {
        console.log('submit: ', values.id);
        if (values.imageUrl) {
            enableLoading();
            const imageUrl = await uploadFiles(values.imageUrl, values.id);
            const createPostData: CreatePostReq | undefined = convertRequest(values, imageUrl);
            if (createPostData) {
                postApi
                    .create(createPostData)
                    .then(() => {
                        actions.resetForm();
                        showSuccess({ detail: 'Create post success' });
                        actions.setFieldValue('id', uuidV4());
                        disableLoading();
                    })
                    .catch((error) => {
                        showError({ detail: 'Create post failed' });
                        console.log(error);
                        disableLoading();
                    });
            } else {
                showError({ detail: 'Some thing when wrong with request data.' });
                disableLoading();
            }
        }
    };

    useEffect(() => {
        categoryApi.getAll().then((response) => {
            const options = response?.data?.map((cate: any) => {
                return {
                    label: cate.name,
                    value: cate.id,
                };
            });
            setOptions(options);
        });
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('breadcrumb')}>
                    <Breadcrumb />
                </div>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    autocomplete="off"
                >
                    {(props: FormikProps<PostFormValue>) => {
                        return (
                            <Form>
                                <div className={cx('inner')}>
                                    <div className={cx('info')}>
                                        <FastField name="title" component={Input} label="Title" />
                                        <FastField
                                            name="description"
                                            component={InputArea}
                                            label="Description"
                                            rows={3}
                                            className={cx('mt-6')}
                                        />
                                        <FastField
                                            name="imageUrl"
                                            component={ImagePicker}
                                            icon={BsFillImageFill}
                                            classNameIcon={cx('icon-upload')}
                                            label="Select images"
                                            classNameLabel={cx('label-upload')}
                                            className={cx('mt-8')}
                                        />
                                    </div>
                                    <div className={cx('separate')}></div>
                                    <div className={cx('info')}>
                                        <FieldArray
                                            name="products"
                                            render={(arrayHelper: FieldArrayRenderProps) => {
                                                const { values } = props;
                                                return (
                                                    <div className={cx('products-wrapper')}>
                                                        <div className={cx('products-header')}>PRODUCTS</div>
                                                        <div className={cx('products-content')}>
                                                            {values.products && values.products.length > 0 ? (
                                                                values.products.map((product, index) => (
                                                                    <div
                                                                        key={product.id}
                                                                        className={cx('products-form')}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => arrayHelper.remove(index)}
                                                                            className={cx('products-btn-remove')}
                                                                        >
                                                                            <AiOutlineClose />
                                                                        </button>
                                                                        <FastField
                                                                            name={`products.${index}.name`}
                                                                            component={Input}
                                                                            label={'Name'}
                                                                            className={cx('w-[85%]')}
                                                                            classNameInput={cx('products-input')}
                                                                            classNameLabel={cx('products-label')}
                                                                        />
                                                                        <ErrorMessage
                                                                            component={'span'}
                                                                            className={cx('field-error')}
                                                                            name={`products.${index}.name`}
                                                                        />

                                                                        <div className={cx('products-category-price')}>
                                                                            <div className={cx('category')}>
                                                                                <Field
                                                                                    name={`products.${index}.categoryId`}
                                                                                    component={Select}
                                                                                    label="Category"
                                                                                    options={options}
                                                                                    selectStyles={
                                                                                        selectStylesCustomField
                                                                                    }
                                                                                    classNameLabel={cx(
                                                                                        'products-label',
                                                                                    )}
                                                                                />
                                                                                <ErrorMessage
                                                                                    component={'span'}
                                                                                    className={cx('field-error')}
                                                                                    name={`products.${index}.categoryId`}
                                                                                />
                                                                            </div>
                                                                            <div className={cx('price')}>
                                                                                <FastField
                                                                                    name={`products.${index}.price`}
                                                                                    component={Input}
                                                                                    label={'Price'}
                                                                                    classNameInput={cx(
                                                                                        'products-input',
                                                                                    )}
                                                                                    classNameLabel={cx(
                                                                                        'products-label',
                                                                                    )}
                                                                                    type="number"
                                                                                />
                                                                                <ErrorMessage
                                                                                    component={'span'}
                                                                                    className={cx('field-error')}
                                                                                    name={`products.${index}.price`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <FastField
                                                                            name={`products.${index}.description`}
                                                                            component={Input}
                                                                            label={'Description'}
                                                                            className="w-full"
                                                                            classNameInput={cx('products-input')}
                                                                            classNameLabel={cx('products-label')}
                                                                        />
                                                                        <ErrorMessage
                                                                            component={'span'}
                                                                            className={cx('field-error')}
                                                                            name={`products.${index}.description`}
                                                                        />
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span></span>
                                                            )}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className={cx('products-btn-add')}
                                                            onClick={() =>
                                                                arrayHelper.push({
                                                                    id: uuidV4(),
                                                                    name: '',
                                                                    description: '',
                                                                    categoryId: '',
                                                                    price: 0,
                                                                })
                                                            }
                                                        >
                                                            <AiOutlinePlus />
                                                            <span>product</span>
                                                        </button>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('btn-submit')}>
                                    <button type="submit">Create</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
}

export default CreatePost;
