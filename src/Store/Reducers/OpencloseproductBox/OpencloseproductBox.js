import { CLOSE_PRODUCT_BOX, OPEN_PRODUCT_BOX } from "@/Store/Actions/OpencloseproductBox/OpencloseproductBox";


const initialState = {
    
    OpenCloseProductBox : false
}

const OpenCloseProductBoxReaducer = ( state = initialState, action ) => {

    if( action.type === OPEN_PRODUCT_BOX) {

        return {
            ...state,
            OpenCloseProductBox : true
        }

    }
    else if( action.type === CLOSE_PRODUCT_BOX ) {

        return {
            ...state,
            OpenCloseProductBox : false
        }

    } else {

        return state;

    }  
}
export default OpenCloseProductBoxReaducer;