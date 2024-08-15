// components/Sheet/Sheet.js

import styles from './sheet.module.css';

export default function Sheet({ cloxbox, title, children }) {
  return (
    <div className={styles.sheet}>
      <button className={styles.close} onClick={cloxbox}>close</button>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};


