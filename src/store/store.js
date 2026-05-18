import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Product/productSlice"
import bookingReducer from "./Booking/bookingSlice"
import userReducer from "./User/userSlice"
import factureReducer from "./Facture/factureSlice"
import alertReducer from "./Alert/alertSlice";
import retributionReducer from "./Retribution/retributionSlice";


const store = configureStore({
    reducer: {
        // mettre ici les futurs réduceur
        products: productReducer,
        bookings: bookingReducer,
        users: userReducer,
        factures: factureReducer,
        alerts: alertReducer,
        retribution: retributionReducer,
    }
})

export default store;