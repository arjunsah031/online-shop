import React from 'react';
import styles from './seller.module.css';
import Image from 'next/image';

const BestSeller = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Best Seller: Choco Bar</h2>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/chocolate.jpg" 
            alt="Choco Bar" 
            width={800} 
            height={300} 
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.productName}>Choco Bar</h3>
          <p className={styles.description}>
            Indulge in the rich, creamy taste of our best-selling Choco Bar. Perfect for chocolate lovers!
          </p>
          <p className={styles.price}>$2.99</p>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
