import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";
import { canAccommodate } from "../../services/capacityFilter";

const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        availableProducts: [],
        startDate: null,
        endDate: null,
        adults: 1,
        children: 0
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAvailableProducts: (state, action) => {
            state.availableProducts = action.payload
        },
        setDates: (state, action) => {
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
        },
        setGuests: (state, action) => {
            state.adults = action.payload.adults;
            state.children = action.payload.children;
        }
    }
})

export const { setLoading, setAvailableProducts, setDates, setGuests } = productSlice.actions

// Méthode qui récupère les biens disponibles selon une période et filtre sur le type
export const fetchAvailableProducts = (startDate, endDate, type = '', capacity = 1, adults = 1, children = 0) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        dispatch(setDates({ startDate, endDate }))
        dispatch(setGuests({ adults, children }))
        const response = await axios.get(`${API_URL}/products`, {
            params: {
                start_date: startDate,
                end_date: endDate,
                ...(type && { title: type }),

            }
        });

        let products = response.data.member || response.data['hydra:member'];

        if (capacity > 0 && products) {
            // Ça fonctionne maintenant parfaitement
            products = products.filter(product => canAccommodate(product.title, capacity));
        }

        dispatch(setAvailableProducts(products));
    } catch (error) {
        console.log(`Erreur lors de la requête des biens disponibles : ${error}`)
    } finally {
        dispatch(setLoading(false))
    }
}

export default productSlice.reducer;