
export const SHOW_PAYMENT_OPTIONS = 'SHOW_PAYMENT_OPTIONS_ajkfds';

export const showPaymentOptionsAction = ( txnToken, orderId, txnAmount ) => {

    return {

        type: SHOW_PAYMENT_OPTIONS,
        txnToken: txnToken,
        orderId: orderId,
        txnAmount: txnAmount,

    }

}

export const CANCEL_TXN = 'CANCEL_TXN_oiuyghj'
export const cancelTxnAction = () => {

    return {

        type: CANCEL_TXN

    }

}




