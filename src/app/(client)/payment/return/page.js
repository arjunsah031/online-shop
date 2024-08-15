"use client"
import { CircleX } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import Header from '../../components/header/header';

export default function ReturnPage() {
    return (
        <div className={styles.Page}>
            <Header/>
            <section className={styles.customHeight}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <CircleX className={styles.icon} fill="#de4a4a" />
                        <h3 className={styles.title}>Payment Failed!</h3>
                        <span className={styles.message}>
                            Your payment could not be processed at this time. Please try again later.
                        </span>
                        <span>Have a great day!</span>
                        <Link href="/">
                            <button className={styles.button}>Go back</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
