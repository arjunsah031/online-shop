import { 
    
    SHOW_PAYMENT_OPTIONS, 
    
    CANCEL_TXN 

} from '../../Actions/TxnDetails/BuyNowProduct'; 


import { ADD_TO_CART } from '../../Actions/AddtoCart/AddtoCart';


const myStates = {

    showPaymentOptions: false,

    txnToken: '',

    orderId: '',

    txnAmount: null
    
}


const inititalState = { ...myStates };


const reducer = ( state = inititalState, action ) => {

    
    if( action.type === SHOW_PAYMENT_OPTIONS ) {

        return {

            ...state,

            showPaymentOptions: true,
            
            txnToken: action.txnToken,

            orderId: action.orderId,
            
            txnAmount: action.txnAmount

        };


    } else if ( action.type === CANCEL_TXN ) {

        return { ...myStates };

    } else if ( action.type === ADD_TO_CART ) {

        return { ...myStates };

    } else {

        return { ...state };

    }


}

export default reducer;



