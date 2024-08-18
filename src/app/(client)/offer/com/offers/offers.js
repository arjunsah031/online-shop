import React from 'react';
import styles from './offers.module.css';
import Image from 'next/image';

const OfferComponent = () => {
    return (
        <div className={styles.offerContainer}>
            <div className={styles.imageWrapper}>
                <Image 
                    src="/product3.jpg" 
                    alt="Choco Bar" 
                    width={300} 
                    height={300} 
                    className={styles.chocoImage}
                />
            </div>
            <div className={styles.offerDetails}>
                <h2 className={styles.offerTitle}>Special Offer!</h2>
                <p className={styles.offerDescription}>
                    Buy 2 Get 1 Free on Choco Bar Chocolate!
                </p>
                <p className={styles.offerPrice}>Only $1.99 per bar!</p>
                <button className={styles.offerButton}>Grab the Deal</button>
            </div>
        </div>
    );
};

export default OfferComponent;
