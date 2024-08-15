

import { ADD_TO_CART, DELETE_CART } from "../../Actions/AddtoCart/AddtoCart"

const initialState = {

    // addtocart :localStorage.hasOwnProperty('addtocart') ? 
    //             JSON.parse(localStorage.getItem('addtocart') ) : [],
    
                addtocart: typeof window !== 'undefined' && window.localStorage.hasOwnProperty('addtocart') ?
        JSON.parse(window.localStorage.getItem('addtocart')) : [],
}

const AddtoCartReducer = ( state = initialState, action ) => {

    if( action.type === ADD_TO_CART) {

        const cartIteams = [ action.CartId, ...state.addtocart ]

        localStorage.setItem( 'addtocart', JSON.stringify(cartIteams))

        return {
            
            ...state,
            addtocart : cartIteams

        }

    } else if( action.type === DELETE_CART ) {

        const deletecart = state.addtocart.filter(item => item !== action.deleteId )

        localStorage.setItem( 'addtocart', JSON.stringify(deletecart))

        return {
            ...state,
            addtocart: deletecart,
        }

    }
    else {
        return state;
    }

}

export default AddtoCartReducer;