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
        updateInvoiceAfterCancellation: (state, action) => {
            const { id, cancellationPath } = action.payload;
            const index = state.factures.findIndex(f => f.id === id || f.id === parseInt(id, 10));
            if (index !== -1) {
                state.factures[index].status = 'cancelled';
                state.factures[index].cancellationPath = cancellationPath;
            }
        }
    }
});

export const { setLoading, setFactures, setError, updateInvoiceAfterCancellation } = factureSlice.actions;

export const fetchAllFactures = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const firstResponse = await axios.get(`${API_URL}/factures`, {
            params: { page: 1 }
        });

        const totalItems = firstResponse.data.totalItems;
        const itemsPerPage = 30;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        let allFactures = firstResponse.data.member || [];

        for (let page = 2; page <= totalPages; page++) {
            const response = await axios.get(`${API_URL}/factures`, {
                params: { page }
            });
            allFactures = [...allFactures, ...(response.data.member || [])];
        }

        console.log(`Récupérées ${allFactures.length} factures (${totalPages} pages)`);
        dispatch(setFactures(allFactures));
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération des factures."));
        console.error(`Erreur fetchAllFactures : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export const cancelInvoice = (factureId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await axios.post(`${API_URL}/factures/${factureId}/cancel`);
        const cancellationPath = response.data.path;

        dispatch(updateInvoiceAfterCancellation({
            id: factureId,
            cancellationPath
        }));

        console.log(`Facture ${factureId} marquée comme annulée.`);
    } catch (error) {
        dispatch(setError("Erreur lors de l'annulation de la facture."));
        console.error(`Erreur cancelInvoice : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export default factureSlice.reducer;