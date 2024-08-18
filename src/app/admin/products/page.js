"use client"
import Table from './com/table/table';
import CssStyle from './page.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProducts, getAllProducts } from '@/http/api';
import Sheet from './com/sheet/sheet';
import { useDispatch, useSelector } from 'react-redux';
import { closeProducBoxtActio, openProductBoxAction } from '@/Store/Actions/OpencloseproductBox/OpencloseproductBox';
import CreateProductForm from './com/createproductForm/createproductForm';

export default function Products() {

  const dispatch = useDispatch();

  const opencloseProductbox = useSelector(s => s.OpenCloseProductBoxReaducer.OpenCloseProductBox);

  const { data: products, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
  ];

  const openBoxHandler = () => {
    dispatch(openProductBoxAction(true));
  };

  const closeBoxHandler = () => {
    dispatch(closeProducBoxtActio(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        return response.json();
    },
    onSuccess: () => {
        // Invalidate and refetch products
        queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
        console.error('Error:', error.message);
    }
});

  const handleSubmit = (formData) => {

    mutation.mutate(formData);
  };

  return (
    <section className={CssStyle.Con}>
      <div className={CssStyle.products}>
        <h3>Products</h3>
        <button onClick={openBoxHandler}>Add Product</button>
      </div>

      {opencloseProductbox && (
        <Sheet cloxbox={closeBoxHandler} title="My Sheet Component">
          <CreateProductForm onSubmit={handleSubmit} />
        </Sheet>
      )}

      <Table columns={columns} data={products || []} />
    </section>
  );
}
