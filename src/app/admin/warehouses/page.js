"use client"


import CssStyle from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  createWarehouses, getAllwarehouses } from '@/http/api';
import { useDispatch, useSelector } from 'react-redux';
import { closeProducBoxtActio, openProductBoxAction } from '@/Store/Actions/OpencloseproductBox/OpencloseproductBox';
import Table from './com/table/table';
import Sheet from './com/sheet/sheet';
import CreatewarehouseForm from './com/createwarehouseForm/createwarehouseForm';


export default function Warehousepage() {

  const dispath = useDispatch()

  const opencloseProductbox = useSelector( s => s.OpenCloseProductBoxReaducer.OpenCloseProductBox)

  const { data:wareshouses, error } = useQuery( {
    queryKey: ['warehouses'],
    queryFn: getAllwarehouses,
  })
 
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Pincode', accessor: 'pincode' },
        
      ];
    
      const openBoxhandler = () => {

        dispath(openProductBoxAction(true))
      }

      const closeBoxHandler = () => {

        dispath(closeProducBoxtActio(false))
      }

      const queryclint = useQueryClient()

      const {mutate} = useMutation({

        mutationKey:['create-warehouses'],
        mutationFn: (data) => createWarehouses(data),
        onSuccess: () => {
            queryclint.invalidateQueries({ queryKey : ['warehouses']});
        }

      })

      const handleSubmit = (data) => {
        console.log(data)
      
        mutate(data)
      }

      // let lodingdata;
      
      // if(!products) {

      //   return lodingdata = <div>loding.</div>
        
      // }

    return <section className={ CssStyle.Con}>
        <div className={ CssStyle.products}>
            <h3>warehouses</h3>
            <button onClick={openBoxhandler}>add warehouse</button>
        </div>

        {opencloseProductbox && <Sheet cloxbox={closeBoxHandler} title="My Sheet Component">
              <p>This is some content inside the sheet component.</p>
             

              <CreatewarehouseForm onSubmit={handleSubmit}   />
            </Sheet>}

        < Table columns={columns} data={ wareshouses || []} />

       
    </section>
}