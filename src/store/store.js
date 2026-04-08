import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import userReducer from "./user/userSlice";
import artistReducer from "./artist/artistSlice";
import productReducer from "./Product/productSlice"

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        products: productReducer
    }
})

export default store;