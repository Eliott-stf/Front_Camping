import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice"

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        products: productReducer
    }
})

export default store;