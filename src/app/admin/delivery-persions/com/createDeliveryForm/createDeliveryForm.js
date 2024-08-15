"use client"
import React from 'react';
import styles from './createDeliveryForm.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllwarehouses } from '@/http/api';
import Select from '../select/select';

export default  function CreateDeliveryForm  ({onSubmit,disabled,}) {
    
    const { data:wareshouses, isLoading } = useQuery( {
        queryKey: ['warehouses'],
        queryFn: getAllwarehouses,
      })


    const [formValues, setFormValues] = React.useState({
        name: '',
        phone: '',
        warehouseId: '',
    });

    const handleChange = (e) => {
        const { name, value, } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name] : value,
        }));
    };

    const handleSelectChange =(value) => {

        setFormValues((prevData) => ({ ...prevData, warehouseId: value }));

    }

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
                    placeholder="e.g.arjun"
                    value={formValues.name}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Phone</label>
                <textarea
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    className={styles.formTextarea}
                />
            </div>
            
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Warehouse ID</label>
                <Select
                    options={
                        isLoading
                            ? [{ value: '', label: 'Loading...' }]
                            : wareshouses?.map((warehouse) => ({
                                  value: warehouse.id,
                                  label: warehouse.name,
                              })) || []
                    }
                    value={formValues.warehouseId}
                    onChange={handleSelectChange}
                    placeholder="Select Warehouse ID"
                />
            </div>

            <button type="submit" className={styles.formButton} disabled={disabled}>
                {disabled ? 'Loading...' : 'Create'}
            </button>
        </form>
    );
};

