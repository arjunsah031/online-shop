"use client"
import Table from './com/table/table';
import CssStyle from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDeliveryprsions, createProducts, getAllDeliverypersions} from '@/http/api';
import Sheet from './com/sheet/sheet';
import { useDispatch, useSelector } from 'react-redux';
import { closeProducBoxtActio, openProductBoxAction } from '@/Store/Actions/OpencloseproductBox/OpencloseproductBox';
import CreateDeliveryForm from './com/createDeliveryForm/createDeliveryForm';




export default function Devilerypage() {

  const dispath = useDispatch()

  const opencloseProductbox = useSelector( s => s.OpenCloseProductBoxReaducer.OpenCloseProductBox)

  const { data:deliverypersions, error } = useQuery( {
    queryKey: ['delivery-prsions'],
    queryFn: getAllDeliverypersions,
  })

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Warehouse', accessor: 'warehouse' },
        
      ];
    
      const openBoxhandler = () => {

        dispath(openProductBoxAction(true))
      }

      const closeBoxHandler = () => {

        dispath(closeProducBoxtActio(false))
      }

      const queryclint = useQueryClient()

      const {mutate} = useMutation({

        mutationKey:['create-delivery'],
        mutationFn: (data) => createDeliveryprsions(data),
        onSuccess: () => {
            queryclint.invalidateQueries({ queryKey : ['delivery-prsions']});
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
            <h3>Delivery persions</h3>
            <button onClick={openBoxhandler}>add delivery p</button>
        </div>

        {opencloseProductbox && <Sheet cloxbox={closeBoxHandler} title="My Sheet Component">
              <p>This is some content inside the sheet component.</p>
              <div>ffhofh</div>

               <CreateDeliveryForm onSubmit={handleSubmit}/>
             
            </Sheet>}

        <Table columns={columns} data={ deliverypersions || []} />

       
    </section>
}