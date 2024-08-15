"use client";

import OpenCloseProductBoxReaducer from "@/Store/Reducers/OpencloseproductBox/OpencloseproductBox";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux"

export default function Reduxprovider({children}) {

    const Reducer = combineReducers( {

        OpenCloseProductBoxReaducer : OpenCloseProductBoxReaducer

        

    })

    const store = createStore(Reducer);

    return <Provider store={store}>

        {children}

    </Provider>
}