'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';

export default function Header() {
    const pathname = usePathname();
    const session = useSession();
    
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Best Selling', href: '/best-selling' },
        { label: 'Offers', href: '/offers' },
        { label: 'Orders', href: '/account/orders' },
    ];

    return (
        <header className={styles.Header}>
            <div className={styles.promoBar}>
                <span className={styles.promoText}>
                    Order 2 Delight Dairy Choco bars today and save ₹100 instantly!
                </span>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navItems}>
                    {navItems.map((item) => (
                        <li
                            key={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ''}`}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                    <li className={styles.loginButton}>
                        {session.status === 'authenticated' ? (
                            <button onClick={() => signOut()}>Logout</button>
                        ) : (
                            <Link href="/api/auth/signin"> Sign in</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
