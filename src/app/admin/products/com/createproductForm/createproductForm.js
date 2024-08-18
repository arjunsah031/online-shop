import React, { useState } from 'react';
import styles from './createproductForm.module.css';

const CreateProductForm = ({ onSubmit, disabled }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: 0,
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === 'price' ? parseFloat(value) || '' : value,
        });
    };

    const handleFileChange = (e) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            image: e.target.files[0], // Set the file object directly
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('price', formValues.price);
        formData.append('image', formValues.image); // Directly append the file object

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        onSubmit(formData); // Pass FormData directly
        
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g. Chocobar"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className={styles.formControl}
                />
                {errors.name && <p className={styles.formMessage}>{errors.name}</p>}
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    className={styles.formControl}
                />
                {errors.description && <p className={styles.formMessage}>{errors.description}</p>}
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className={styles.formControl}
                />
                {errors.image && <p className={styles.formMessage}>{errors.image}</p>}
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                    className={styles.formControl}
                />
                {errors.price && <p className={styles.formMessage}>{errors.price}</p>}
            </div>
            <button type="submit" className={styles.button} disabled={disabled}>
                {disabled ? 'Loading...' : 'Create'}
            </button>
        </form>
    );
};

export default CreateProductForm;
