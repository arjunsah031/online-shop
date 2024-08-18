'use client';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Header from '../../components/header/header';
import { CircleCheck, Loader2 } from 'lucide-react';
import { capitalizeFirstLetter } from '@/lib/utils';
import styles from './page.module.css';
import { getMyOrders } from '@/http/api';

const MyOrdersPage = () => {
    const {
        data: myOrders,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['my-orders'],
        queryFn: getMyOrders,
    });

    console.log('data', myOrders);

    return (
        <div>
            <Header />
            <section className={`relative border-t ${styles.section}`}>
                <div className={`mx-auto h-full max-w-5xl px-5 py-14 ${styles.container}`}>
                    <h1 className={`mb-2 text-3xl font-bold ${styles.title}`}>Order history</h1>
                    <p className="mb-5">Check the status of recent orders.</p>
                    <div className={styles.Cart}>
                        {isLoading && <Loader2 className={`${styles.loader} size-10 animate-spin`} />}
                        {isError && <span>Something went wrong</span>}
                        {myOrders?.slice(0, 7).map((item) => (
                            <div key={item.id}>
                                  <div className={`flex gap-x-10 p-5 ${styles.productDetails}`}>
                                    {/* <Image
                                        src={`/assets/${item.image}`}
                                        alt="img"
                                        width={120}
                                        height={120}
                                        className="aspect-square rounded-md object-cover"
                                    /> */}
                                    <div className={styles.productCon}>
                                        <div className="flex justify-between">
                                            <h3 className={`text-2xl font-semibold ${styles.productName}`}>
                                                {item.product}
                                            </h3>
                                            <span className="text-2xl font-semibold">
                                                ${item.price}
                                            </span>
                                        </div>
                                        <p>{item.productDescription}</p>
                                        <div className="flex justify-end">
                                            <div className={styles.statuscon}>
                                                <CircleCheck
                                                    className="size-5 text-white"
                                                    fill="#4ade80"
                                                />
                                                <span className={`text-sm ${styles.status}`}>
                                                    {capitalizeFirstLetter(item.status)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div />

                              

                                <div className={`flex gap-x-5 ${styles.orderDetails}`}>
                                    <div className="flex flex-col p-5 text-sm">
                                        <span className="font-medium">Date placed</span>
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>
                                    <div className="flex flex-col p-5 text-sm">
                                        <span className="font-medium">Total amount</span>
                                        <span>${item.price}</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyOrdersPage;

function formatDate(isoString) {
    const date = new Date(isoString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}
