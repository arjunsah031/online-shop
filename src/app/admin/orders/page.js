'use client';

import { getAllOrders } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';
import Table from './com/table/table';
import styles from './page.module.css'


export default function OrdersPage (){

  const columns = [
    { header: 'Product Name', accessor: 'product' },
    { header: 'Qty', accessor: 'qty' },
    { header: 'Customer Name', accessor: 'user' },
    { header: 'Order Type', accessor: 'type' },
    { header: 'Address', accessor: 'address' },
    { header: 'Status', accessor: 'status' },
    
  ];
    const {
        data: orders,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    console.log(orders)

    return (
        <>
            <div className={styles.products}>
                <h3 className="text-2xl font-bold tracking-tight">Orders</h3>
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className={styles.LoderCon}>
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <Table columns={columns} data={orders || []} />
            )}
        </>
    );
};


