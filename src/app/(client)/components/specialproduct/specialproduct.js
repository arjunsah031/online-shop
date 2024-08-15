
import Image from 'next/image';
import styles from './specialproduct.module.css';

export default function SpecialProducts() {
    const products = [
        { src: '/product1.jpg', alt: 'product1', name: 'Cadbury Dairy Milk' },
        { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
        { src: '/product3.jpg', alt: 'product3', name: 'Lindt Excellence Bar' },
        { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
    ];

    return (
        <section className={styles.container}>
            <div className={styles.headingContainer}>
                <div className={styles.separator} />
                <h2 className={styles.heading}>
                    Special Products
                </h2>
                <div className={styles.separator} />
            </div>
            <div className={styles.productsGrid}>
                {products.map((product, index) => (
                    <div key={index} className={styles.productCard}>
                        <Image
                            src={product.src}
                            alt={product.alt}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '220px', height: '220px' }}
                            className={styles.productImage}
                        />
                        <p className={styles.productName}>{product.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
