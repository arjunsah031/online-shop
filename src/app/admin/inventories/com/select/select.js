import React from 'react';
import styles from './select.module.css';


export default function Select({ options, value, onChange, placeholder, disabled }){
    return (
        <div className={styles.selectWrapper}>
            <select
                className={styles.select}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                {placeholder && <option value="">{placeholder}</option>}
                
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};


