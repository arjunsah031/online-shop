'use client';
import {  createorder, getSingleProducts, placeOrder } from '@/http/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Header from '../../components/header/header';
import { Skeleton } from '@/componentsui/skeleton/skeleton';
import { Loader2, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './page.module.css';


const SingleProduct = () => {

    const [ serverError, setserverError] = useState('')

    const { data: session} = useSession()
    
    const params = useParams();
    const pathname = usePathname();
    const id = params.id;


    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        qty: 1,
        productId:  id
    });

    const [formErrors, setFormErrors] = useState({
        address: '',
        pincode: '',
        qty: '',
    });

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getSingleProducts(id),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['order'],
        mutationFn: (data) =>  createorder(data),

        onSuccess: (data) => {
            window.location.href = data.paymentUrl;
            console.log('order create')
        },
        onError: (err) => {
            if (err.response?.data) {
                const customErr = err.response.data;
                setserverError(customErr.message); 
                setTimeout(() => {
                    setserverError('');
                      
                }, 4000);
                 
                
            } else {
                console.error('Unknown error');
            }
            
        },
    
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {
            address: '',
            pincode: '',
            qty: '',
        };
        let isValid = true;

        if (!formData.address) {
            errors.address = 'Address is required';
            isValid = false;
        }

        if (!formData.pincode) {
            errors.pincode = 'Pincode is required';
            isValid = false;
        } else if (!/^\d+$/.test(formData.pincode)) {
            errors.pincode = 'Pincode must be a number';
            isValid = false;
        }

        if (!formData.qty || formData.qty <= 0) {
            errors.qty = 'Quantity must be at least 1';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData)
            mutate(formData);
        }

        
    };

    const price = useMemo(() => {
        if (product?.price) {
            return product.price * formData.qty;
        }
        return 0;
    }, [formData.qty, product]);

    return (
        <>
            <Header />
            <section className={`${styles.customHeight} relative`}>
                <div className={`${styles.z50} ${styles.mxAuto} ${styles.flex} ${styles.hFull} ${styles.maxW6xl} ${styles.gapX10} ${styles.px5} ${styles.py14} ${styles.mdPy20}`}>
                    <div className={ styles.imagecon}>
                        {isLoading ? (
                            <Skeleton className={`${styles.aspectSquare} ${styles.w28rem} ${styles.bgBrown100}`} />
                        ) : (
                            <Image
                                src={product?.image || '/product3.jpg'}
                                alt={product?.name || 'Product Image'}
                                width={300}
                                height={300}
                                 
                            />
                        )}
                    </div>

                    {isLoading ? (
                        <div className={`${styles.flex} ${styles.flex1} ${styles.flexCol} ${styles.gapY2}`}>
                            <Skeleton className={`${styles.h4} ${styles.w16} ${styles.bgBrown100}`} />
                            <Skeleton className={`${styles.h10} ${styles.w2_3} ${styles.bgBrown100}`} />
                            <div className={`${styles.flexItemsCenter} ${styles.gapX3}`}>
                                <div className={`${styles.flexItemsCenter} ${styles.gapX0_5}`}>
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" />
                                </div>
                                <span className={styles.textSm}>144 Reviews</span>
                            </div>
                            <Skeleton className={`${styles.mt2} ${styles.h28} ${styles.wFull} ${styles.bgBrown100}`} />
                            <div className={`${styles.my6} ${styles.bgBrown900}`} />
                            <div className={`${styles.flexItemsCenter} ${styles.justifyBetween}`}>
                                <Skeleton className={`${styles.h10} ${styles.w28} ${styles.bgBrown100}`} />
                                <Skeleton className={`${styles.h10} ${styles.w60} ${styles.bgBrown100}`} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.cardright}>
                            <h1 >BRAND NAME</h1>
                            <h3 >{product?.name}</h3>

                            <div className={ styles.ratingcon}>
                                <div className={`${styles.flexItemsCenter} ${styles.gapX0_5}`}>
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" fill="#facc15" />
                                    <Star className="size-4 text-yellow-400" />
                                </div>
                                <span className={styles.textSm}>144 Reviews</span>
                            </div>

                            <p className={styles.mt1}>{product?.description}</p>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.formcon}>
                                    <div className={styles.w3_6}>
                                        <label>Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={styles.textArea}
                                            placeholder="e.g. Open street, 55"
                                        />
                                        {formErrors.address && <span className={styles.textXs}>{formErrors.address}</span>}
                                    </div>
                                    <div className={styles.w3_6}>
                                        <label>Pincode</label>
                                        <input
                                            type="number"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className={styles.pincode}
                                            placeholder="e.g. 567987"
                                        />
                                        {formErrors.pincode && <span className={styles.textXs}>{formErrors.pincode}</span>}
                                    </div>
                                    <div className={styles.w3_6}>
                                        <label>Qty</label>
                                        <input
                                            type="number"
                                            name="qty"
                                            value={formData.qty}
                                            onChange={handleInputChange}
                                            className={styles.qty}
                                            placeholder="e.g. 1"
                                        />
                                        {formErrors.qty && <span className={styles.textXs}>{formErrors.qty}</span>}
                                    </div>
                                </div>
                                <div className={`${styles.my6} ${styles.bgBrown900}`} />
                                <div className={`${styles.flexItemsCenter} ${styles.justifyBetween}`}>
                                    <span className={styles.price}>${price}</span>
                                    {session ? (
                                        <button type="submit" disabled={isPending} >
                                            {isPending && (
                                                <>
                                                    <Loader2 className="mr-2 size-5 animate-spin" />
                                                </>
                                            )}
                                            <span className={styles.ByeNowbtn}>Buy Now</span>
                                        </button>
                                    ) : (
                                        <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                                            <button>Buy Now</button>
                                        </Link>
                                    )}
                                </div>

                                 <div className={ styles.serverError}>

                                    { serverError && <span> {serverError} </span>}

                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default SingleProduct;
