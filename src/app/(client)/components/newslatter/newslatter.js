
import Image from 'next/image';
import React from 'react';
import styles from './newslatter.module.css';

export default function NewsLetter() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Stay Updated with Newsletter</h2>
                <p className={styles.text}>
                    Get the latest news, exclusive offers, and delicious updates delivered right to
                    your inbox with our chocolate and cake shop newsletter.
                </p>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder="Enter your email address"
                    />
                    <button
                        variant="secondary"
                        className={styles.button}
                        size="sm">
                        Subscribe
                    </button>
                </div>
                <Image
                    src="/choco-bg.jpg"
                    alt="Hero Chololate"
                    fill
                    className={styles.image}
                />
                <div className={styles.overlay} />
            </div>
        </section>
    );
}
