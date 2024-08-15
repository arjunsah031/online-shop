
import Image from 'next/image';
import React from 'react';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className={styles.customHeight}>
            <div className={`${styles.container} mx-auto`}>
                <h1 className={styles.heroTitle}>
                    10 Minute Delivery <br /> At Your Door
                </h1>
                <p className={styles.heroDescription}>
                    Why wait? Our 10-minute delivery service brings your favorite chocolates right
                    to your door, swiftly and reliably. Convenience and indulgence, all in one
                    package.
                </p>
                <button variant="secondary" className={styles.heroButton}>
                    Shop Now
                </button>
            </div>

            <Image
                src="/chocolate.jpg"
                alt="Hero Chololate"
                fill
                className={styles.heroImage}
            />
            <div className={styles.overlay} />
        </section>
    );
}
