import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";
import { canAccommodate } from "../../services/capacityFilter";

const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        availableProducts: [],
        allProducts: [],
        productDetail: null,
        startDate: null,
        endDate: null,
        adults: 1,
        children: 0,
        services: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAvailableProducts: (state, action) => {
            state.availableProducts = action.payload
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        setProductDetail: (state, action) => {
            state.productDetail = action.payload
        },
        setDates: (state, action) => {
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
        },
        setGuests: (state, action) => {
            state.adults = action.payload.adults;
            state.children = action.payload.children;
        },
        setServices: (state, action) => {
            state.services = action.payload
        },
    }
})

export const { setLoading, setAvailableProducts, setAllProducts, setProductDetail, setDates, setGuests, setServices } = productSlice.actions

// Méthode qui récupère TOUS les produits pour l'admin
export const fetchAllProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${API_URL}/products`);
        const products = response.data.member;
        dispatch(setAllProducts(products));
    } catch (error) {
        console.log(`Erreur lors de la requête de tous les produits : ${error}`)
        dispatch(setAllProducts([]));
    } finally {
        dispatch(setLoading(false))
    }
}

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

// Méthode qui récupère les détails d'un bien spécifique par son ID
export const fetchProductDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${API_URL}/products/${id}`);
        dispatch(setProductDetail(response.data));
    } catch (error) {
        console.log(`Erreur lors de la requête du bien détail : ${error}`)
        dispatch(setProductDetail(null))
    } finally {
        dispatch(setLoading(false))
    }
}
//méthode qui récupère les product du type service
export const fetchServices = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products?type=service`)
        dispatch(setServices(response.data.member))
    } catch (error) {
        console.log(`Erreur fetchServices : ${error}`)
    }
}

export default productSlice.reducer;