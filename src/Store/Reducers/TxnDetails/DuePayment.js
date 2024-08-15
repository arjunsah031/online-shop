import { 
    
    SET_DUE_PAYMENT_DETAILS

} from '../../Actions/TxnDetails/DuePayment';


const myStates = {

    orderId: null,

    txnAmount: null
    
}


const inititalState = { ...myStates };


const reducer = ( state = inititalState, action ) => {

    
    if( action.type === SET_DUE_PAYMENT_DETAILS ) {

        return {

            ...state,

            orderId: action.orderId,

            txnAmount: action.txnAmount

        };


    } else {

        return { ...state };

        
    }


}

export default reducer;



