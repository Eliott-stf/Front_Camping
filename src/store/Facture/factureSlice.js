import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const factureSlice = createSlice({
    name: "facture",
    initialState: {
        loading: false,
        factures: [],
        error: null,
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setFactures: (state, action) => { state.factures = action.payload },
        setError: (state, action) => { state.error = action.payload },
    }
});

export const { setLoading, setFactures, setError } = factureSlice.actions;

export const fetchAllFactures = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        // Première page pour récupérer totalItems
        const firstResponse = await axios.get(`${API_URL}/factures`, {
            params: { page: 1 }
        });

        const totalItems = firstResponse.data.totalItems;
        const itemsPerPage = 30; // défaut API Platform
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        let allFactures = firstResponse.data.member || [];

        // Récupérer les pages restantes
        for (let page = 2; page <= totalPages; page++) {
            const response = await axios.get(`${API_URL}/factures`, {
                params: { page }
            });
            allFactures = [...allFactures, ...(response.data.member || [])];
        }

        console.log(`✅ Récupérées ${allFactures.length} factures (${totalPages} pages)`);
        dispatch(setFactures(allFactures));
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération des factures."));
        console.error(`Erreur fetchAllFactures : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export default factureSlice.reducer;