import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const retributionSlice = createSlice({
    name: 'retribution',
    initialState: {
        data: null,
        loading: false,
        isLocked: false,
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setRetributionData: (state, action) => {
            state.data = action.payload;
            state.isLocked = false;
        },
        setLocked: (state) => {
            state.data = null;
            state.isLocked = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearRetribution: (state) => {
            state.data = null;
            state.isLocked = false;
            state.error = null;
        }
    }
});

export const { setLoading, setRetributionData, setLocked, setError, clearRetribution } = retributionSlice.actions;

// DANS store/Retribution/retributionSlice.js

export const fetchOwnerRetribution = (year) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_URL}/retributions/owner/${year}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Structure brute reçue du serveur :", response.data);
        // Sécurité : s'assure de récupérer les données qu'elles soient encapsulées ou brutes
        let cleanData = response.data.member || response.data['hydra:member'] || response.data;

        // Si c'est un array, prendre le premier élément
        if (Array.isArray(cleanData) && cleanData.length > 0) {
            cleanData = cleanData[0];
        }

        console.log("Données nettoyées envoyées au Store :", cleanData);
        dispatch(setRetributionData(cleanData));
    } catch (error) {
        if (error.response && error.response.status === 403) {
            dispatch(setLocked());
        } else {
            dispatch(setError("Erreur lors de la récupération des rétributions."));
            console.error(`Erreur fetchOwnerRetribution : ${error}`);
        }
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchAdminRetribution = (ownerId, year) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await axios.get(`${API_URL}/retributions/admin/owner/${ownerId}/${year}`);

        let cleanData = response.data.member || response.data['hydra:member'] || response.data;

        // Si c'est un array, prendre le premier élément
        if (Array.isArray(cleanData) && cleanData.length > 0) {
            cleanData = cleanData[0];
        }

        dispatch(setRetributionData(cleanData));
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération de la simulation des rétributions."));
        console.error(`Erreur fetchAdminRetribution : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export default retributionSlice.reducer;