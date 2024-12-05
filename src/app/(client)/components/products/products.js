'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Skeleton } from '@/componentsui/skeleton/skeleton';
import styles from './products.module.css';
import { date } from 'zod';

const Products = () => {
    const skeletons = Array.from({ length: 4 });
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: 10 * 1000,
    });

    const [loading, setLoading] = useState(null);
    const router = useRouter();

    const handleClick = async (productId) => {
        setLoading(productId);
        console.log(productId)

        // Wait for a brief moment to allow the loading spinner to be visible
        

        await router.push(`/product/${productId}`);

        // Optionally reset loading state after navigation
        
    };

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
                            {products?.map((product) => (
                                <div key={product.id} className={styles.productCard}>
                                    <Image
                                        src={`/assets/${product.image}`}
                                        alt={product.name}
                                        width={300}  // Adjust the width as needed
                                        height={300}  // Adjust the height as needed
                                        className={styles.image}
                                    />

                                    <div className={styles.textContainer}>
                                        <p className={styles.productName}>{product.name}</p>
                                        <div className={styles.priceContainer}>
                                            <span className={styles.price}>${product.price}</span>
                                        </div>

                                        <div className={styles.buttonCon} >

                                        {loading === product.id ? (
                                            <div className={styles.spinner}></div>
                                        ) : (
                                            <button
                                                onClick={() => handleClick(product.id)}
                                                
                                            >
                                                Buy Now
                                            </button>
                                        )}
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Products;
