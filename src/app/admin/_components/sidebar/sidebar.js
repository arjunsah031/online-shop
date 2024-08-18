"use client"
import Link from 'next/link';
import CssStyle from './sidebar.module.css';
import {  usePathname } from 'next/navigation';

export default function Sidebar () {

    const pathname = usePathname();

    const navItems = [
        { label: 'Admin', href: '/admin' },
        { label: 'products', href: '/admin/products' },
        { label: 'Warehouses', href: '/admin/warehouses' },
        { label: 'DeliveryPerson', href: '/admin/delivery-persions' },
        { label: 'Orders', href: '/admin/orders' },
        { label: 'Inventories', href: '/admin/inventories' },
    ];
    return (
        <nav className={CssStyle.sidebar}>
            <ul>
                    {navItems.map((item) => (
                        <li
                            key={item.href}
                            className={`${CssStyle.navItem} ${pathname === item.href ? CssStyle.navItemActive : ''}`}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};

