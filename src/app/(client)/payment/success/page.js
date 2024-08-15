import { CircleCheck } from 'lucide-react';
import Link from 'next/link';


import styles from './page.module.css'
import Header from '../../components/header/header';

export default function SuccessPage() {

    return <div>
     <Header/>
    <section className={styles.customHeight}>
        <div className={styles.container}>
            <div className={styles.card}>
                <CircleCheck className={styles.icon} fill="#4ade80" />
                <h3 className={styles.title}>Payment Done!</h3>
                <span className={styles.message}>
                    Thank you for completing your secure online payment.
                </span>
                <span>Have a great day!</span>
                <Link href="/">
                    <button className={styles.button}>Go back</button>
                </Link>
            </div>
        </div>
    </section>
   
    </div>
}
