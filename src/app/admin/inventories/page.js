"use client"
import Table from './com/table/table';
import CssStyle from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDeliveryprsions,  createinventories,  getAllinvertories,} from '@/http/api';

import { useDispatch, useSelector } from 'react-redux';
import { closeProducBoxtActio, openProductBoxAction } from '@/Store/Actions/OpencloseproductBox/OpencloseproductBox';

import CreateinventoriesForm from './com/createinvetoriesform/createinvetoriesform';
import Sheet from './com/sheet/sheet';


export default function Devilerypage() {

  const dispath = useDispatch()

  const opencloseProductbox = useSelector( s => s.OpenCloseProductBoxReaducer.OpenCloseProductBox)

  const { data:inventories, error } = useQuery( {
    queryKey: ['inventories'],
    queryFn: getAllinvertories,
  })

    const columns = [
        { header: 'SKU', accessor: 'sku' },
        { header: 'warehouse', accessor: 'warehouse' },
        { header: 'product', accessor: 'product' },
        
      ];
    
      const openBoxhandler = () => {

        dispath(openProductBoxAction(true))
      }

      const closeBoxHandler = () => {

        dispath(closeProducBoxtActio(false))
      }

      const queryclint = useQueryClient()

      const {mutate} = useMutation({

        mutationKey:['create-inventories'],
        mutationFn: (data) => createinventories(data),
        onSuccess: () => {
            queryclint.invalidateQueries({ queryKey : ['inventories']});
        }

      })

      const handleSubmit = (data) => {
        
        mutate(data)
      }

    return <section className={ CssStyle.Con}>
        <div className={ CssStyle.products}>
            <h3>Inventories</h3>
            <button onClick={openBoxhandler}>add inventories </button>
        </div>

        {opencloseProductbox && <Sheet cloxbox={closeBoxHandler} title="My Sheet Component">

              <p>This is some content inside the sheet component.</p>
              
              <CreateinventoriesForm onSubmit={handleSubmit}/>
             
              </Sheet>}

        <Table columns={columns} data={ inventories || []} />

       
    </section>
}