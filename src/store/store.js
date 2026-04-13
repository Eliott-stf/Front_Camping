import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice"
import bookingReducer from "./Booking/bookingSlice"
import userReducer from "./User/userSlice"

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        products: productReducer,
        bookings: bookingReducer,
        users: userReducer
    }
})

export default store;