"use client"
import React from 'react';
import styles from './createinvetoriesform.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getAllwarehouses } from '@/http/api';
import Select from '../select/select';

export default  function CreateinventoriesForm  ({onSubmit,disabled,}) {
    
    const { data:wareshouses, isLoading:isLoadingwarehouse } = useQuery( {
        queryKey: ['warehouses'],
        queryFn: getAllwarehouses,
      })

    const { data:products, isLoading:isLoadingproducts } = useQuery( {
        queryKey: ['products'],
        queryFn: getAllProducts,
      })

      console.log(products)


    const [formValues, setFormValues] = React.useState({
        sku: '',
        warehouseId: '',
        productId: ''
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
    const handleSelectChangeProduct =(value) => {

        setFormValues((prevData) => ({ ...prevData, productId: value }));

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formValues);

    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.formItem}>
                <label className={styles.formLabel}>SKU</label>
                <input
                    name="sku"
                    placeholder="e.g.ch42345"
                    value={formValues.sku}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Warehouse ID</label>
                <Select
                    options={
                        isLoadingwarehouse
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
            
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Product ID</label>
                <Select
                    options={
                        isLoadingproducts
                            ? [{ value: '', label: 'Loading...' }]
                            : products?.map((product) => ({
                                  value: product.id,
                                  label: product.name,
                              })) || []
                    }
                    value={formValues.productId}
                    onChange={handleSelectChangeProduct}
                    placeholder="Select product Id "
                />
            </div>

            <button type="submit" className={styles.formButton} disabled={disabled}>
                {disabled ? 'Loading...' : 'Create'}
            </button>
        </form>
    );
};

