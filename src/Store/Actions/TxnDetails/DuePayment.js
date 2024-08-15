

export const SET_DUE_PAYMENT_DETAILS = 'SET_DUE_PAYMENT_DETAILS_78454565t';
export const setDuePaymentDetailsAction = ( orderId, txnAmount ) => {


    return {

        type: SET_DUE_PAYMENT_DETAILS,
        orderId: orderId,
        txnAmount: txnAmount

    }

}



