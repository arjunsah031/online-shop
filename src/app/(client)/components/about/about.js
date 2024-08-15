

import React from 'react';
import styles from './about.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className="flex justify-center items-center gap-5">
                    <div className={styles.separator} />
                    <h2 className={styles.heading}>
                        Special Products
                    </h2>
                    <div className={styles.separator} />
                </div>
                <p className={styles.text}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, veritatis vero
                    dolorem accusantium ea voluptatum libero accusamus doloremque debitis,
                    voluptatibus ad incidunt dolore, iste sunt. Cumque repellat est dignissimos.
                    Voluptatem eaque veniam deserunt quo. Molestiae at maxime nobis rerum eligendi.
                </p>
                <button className={styles.button}>
                    Shop Now
                </button>
            </div>
        </section>
    );
}
