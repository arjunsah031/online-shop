import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.text}>© 2023 Choco. All rights reserved.</span>
        </footer>
    );
}
