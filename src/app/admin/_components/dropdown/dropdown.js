"use client"
import { useState } from 'react';
import styles from './dropdown.module.css';
import { signOut } from 'next-auth/react';

const DropdownMenu = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const logouthandlr = () => {

        signOut();

    }

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={`${styles.dropdownTrigger} rounded-full`}>
                <span className={styles.srOnly}>Toggle user menu</span>
                &#128100; {/* You can replace this with an icon component like CircleUser */}
            </button>
            {isOpen && (
                <div className={styles.dropdownContent} onBlur={closeDropdown} tabIndex={0}>
                    <span className={styles.dropdownLabel}>My Account</span>
                    <div className={styles.dropdownSeparator}></div>
                    <a href="#settings" className={styles.dropdownItem}>Settings</a>
                    <a href="#support" className={styles.dropdownItem}>Support</a>
                    <div className={styles.dropdownSeparator}></div>
                    {session && (
                        <a onClick={logouthandlr} href="#logout" className={styles.dropdownItem}>Logout</a>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
