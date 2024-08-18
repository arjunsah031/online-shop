"use client"
import { useSession } from 'next-auth/react';
import CssStyle from './header.module.css';
import DropdownMenu from '../dropdown/dropdown';

export default function  AdminHeader () {

    const session = useSession();

    return (
        <header className={CssStyle.header}>
            <div className={CssStyle.logo}>
                ONLINE SHOP
            </div>
            <nav className={CssStyle.nav}>
                <ul>
                <div>
            
            <DropdownMenu session={session} />
        </div>
                </ul>
            </nav>
        </header>
    );
};

