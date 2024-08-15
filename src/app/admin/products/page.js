"use client"
import Table from './com/table/table';
import CssStyle from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProducts, getAllProducts } from '@/http/api';
import Sheet from './com/sheet/sheet';
import { useDispatch, useSelector } from 'react-redux';
import { closeProducBoxtActio, openProductBoxAction } from '@/Store/Actions/OpencloseproductBox/OpencloseproductBox';
import CreateProductForm from './com/createproductForm/createproductForm';
import { useState } from 'react';

export default function Products() {

  const dispath = useDispatch()

  const opencloseProductbox = useSelector( s => s.OpenCloseProductBoxReaducer.OpenCloseProductBox)

  const { data:products, error } = useQuery( {
    queryKey: ['products'],
    queryFn: getAllProducts,
  })
 
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Price', accessor: 'price' },
        
      ];
    
      const openBoxhandler = () => {

        dispath(openProductBoxAction(true))
      }

      const closeBoxHandler = () => {

        dispath(closeProducBoxtActio(false))
      }

      const queryclint = useQueryClient()

      const {mutate} = useMutation({

        mutationKey:['create-products'],
        mutationFn: (data) => createProducts(data),
        onSuccess: () => {
            queryclint.invalidateQueries({ queryKey : ['products']});
        }

      })

      const handleSubmit = (data) => {
      
        mutate(data)
      }

      // let lodingdata;
      
      // if(!products) {

      //   return lodingdata = <div>loding.</div>
        
      // }

    return <section className={ CssStyle.Con}>
        <div className={ CssStyle.products}>
            <h3>Products</h3>
            <button onClick={openBoxhandler}>add product</button>
        </div>

        {opencloseProductbox && <Sheet cloxbox={closeBoxHandler} title="My Sheet Component">
              <p>This is some content inside the sheet component.</p>
              <div>ffhofh</div>

              <CreateProductForm onSubmit={handleSubmit}   />
            </Sheet>}

        <Table columns={columns} data={ products || []} />

       
    </section>
}