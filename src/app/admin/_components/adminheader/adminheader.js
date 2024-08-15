"use client"
import CssStyle from './header.module.css';

export default function  AdminHeader () {
    return (
        <header className={CssStyle.header}>
            <div className={CssStyle.logo}>
                ONLINE SHOP
            </div>
            <nav className={CssStyle.nav}>
                <ul>
                    <li>
                        <a href="/profile">Profile</a>
                    </li>
                    <li>
                        <a href="/logout">Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

