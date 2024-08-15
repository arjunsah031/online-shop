
export const ADD_TO_CART = 'ADD_TO_CART';
export const addtoCartAction = id => {

    return {
        
        type : ADD_TO_CART,
        CartId : id
    }
}

export const DELETE_CART = 'DELETE_CART';
export const deleteCartAction = id => {

    return {

        type : DELETE_CART,
        deleteId : id
    }
}