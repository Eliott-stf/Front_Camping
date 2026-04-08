import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        availableProducts: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAvailableProducts: (state, action) => {
            state.availableProducts = action.payload
        }
    }
})

export const { setLoading, setAvailableProducts } = productSlice.actions

// Méthode qui récupère les biens disponibles selon une période
export const fetchAvailableProducts = (startDate, endDate) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${API_URL}/products?start_date=${startDate}&end_date=${endDate}`)
        dispatch(setAvailableProducts(response.data))
    } catch (error) {
        console.log(`Erreur lors de la requête des biens disponibles : ${error}`)
    } finally {
        dispatch(setLoading(false))
    }
}

export default productSlice.reducer;