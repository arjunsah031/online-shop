"use client";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux"

import AddtoCartReducer from "./Reducers/AddtoCart/AddtoCart";
import BuyNowProductReducer from "./Reducers/TxnDetails/BuyNowProduct";
import LoginsignupBoxReducer from "./Reducers/LoginSignupBox/LoginSignupBox";

export default function Reduxstore({children}) {

    const Reducer = combineReducers( {

        AddtoCartReducer : AddtoCartReducer,
        BuyNowProductReducer : BuyNowProductReducer,
        LoginsignupBox : LoginsignupBoxReducer,

    })

    const store = createStore(Reducer);

    return <Provider store={store}>

        {children}

    </Provider>
}