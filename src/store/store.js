import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice"
import bookingReducer from "./Booking/bookingSlice"

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        products: productReducer,
        bookings: bookingReducer
    }
})

export default store;