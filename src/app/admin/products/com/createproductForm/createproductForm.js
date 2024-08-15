"use client"
import React from 'react';
import styles from './createproductForm.module.css';

export default function CreateProductForm  ({onSubmit,disabled,}) {

    const [formValues, setFormValues] = React.useState({
        name: '',
        description: '',
        price: 0,
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
                    placeholder="e.g. Chocobar"
                    value={formValues.name}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    className={styles.formTextarea}
                />
            </div>
            
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Price</label>
                <input
                    name="price"
                    type="number"
                    value={formValues.price}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>

            <button type="submit" className={styles.formButton} disabled={disabled}>
                {disabled ? 'Loading...' : 'Create'}
            </button>
        </form>
    );
};

