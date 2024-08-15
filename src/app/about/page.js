import dynamic from 'next/dynamic';
import Header from '../(client)/components/header/header';
import style from './page.module.css'

const GooglePayButton = dynamic(() => import('./com/gpaybutton'), {
  ssr: false, // This ensures it's only rendered on the client side
});

const CheckoutPage = () => {
  return (
    <>
    <Header/>
    <div className={style.con}>
      <h1>Checkout</h1>
      <GooglePayButton />
    </div>
    </>
  );
};

export default CheckoutPage;
