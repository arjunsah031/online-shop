'use client';
import Image from 'next/image';

import React from 'react';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';

import { Skeleton } from '@/componentsui/skeleton/skeleton';
import styles from './products.module.css';

const Products = () => {
    const skeletons = Array.from({ length: 4 });
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: 10 * 1000,
    });

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.separator} />
                    <h2 className={styles.heading}>Products</h2>
                    <div className={styles.separator} />
                </div>

                <div className={styles.productCon}>
                    {isLoading ? (
                        <>
                            {skeletons.map((_, i) => (
                                <div key={i} className={styles.skeletonContainer}>
                                    <Skeleton className={`${styles.skeleton} ${styles.aspectSquare}`} />
                                    <Skeleton className={`${styles.skeleton} ${styles.skeletonShort}`} />
                                    <Skeleton className={`${styles.skeleton} ${styles.skeletonShort}`} />
                                    <Skeleton className={`${styles.skeleton} ${styles.skeletonTall}`} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {products?.map((product) => {
                                return (
                                    <div key={product.id} className={styles.productCard}>
                                        <Image
                                            src={`/assets/${product.image}`}
                                            alt={product.name}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            
                                            className={styles.image}
                                        />

                                        <div className={styles.textContainer}>
                                            <p className={styles.productName}>
                                                {product.name}
                                            </p>
                                            <div className={styles.priceContainer}>
                                                <span className={styles.price}>${product.price}</span>
                                            </div>

                                            <Link href={`/product/${product.id}`}>
                                                <button
                                    
                                                    className={styles.button}>
                                                    Buy Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
            
        </section>
    );
};

export default Products;
