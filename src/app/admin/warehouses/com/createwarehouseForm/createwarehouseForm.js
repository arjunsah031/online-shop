"use client"
import React from 'react';
import styles from './createwarehouseForm.module.css';

export default function CreatewarehouseForm  ({onSubmit,disabled,}) {

    const [formValues, setFormValues] = React.useState({
        name: '',
        pincode: '',
        
    });

    const handleChange = (e) => {
        const { name, value, } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);

    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>Name</label>
                <input
                    name="name"
                    placeholder="e.g. noida"
                    value={formValues.name}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>pincode</label>
                <textarea
                    name="pincode"
                    value={formValues.pincode}
                    onChange={handleChange}
                    className={styles.formTextarea}
                />
            </div>
            

            <button type="submit" className={styles.formButton} disabled={disabled}>
                {disabled ? 'Loading...' : 'Create'}
            </button>
        </form>
    );
};

