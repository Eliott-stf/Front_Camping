import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
        tenantAlerts: { warning: [], absolute: [] },
        ownerAlerts: [],
        invoiceAlerts: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setTenantAlerts: (state, action) => {
            state.tenantAlerts = action.payload;
        },
        setOwnerAlerts: (state, action) => {
            state.ownerAlerts = action.payload;
        },
        setInvoiceAlerts: (state, action) => {
            state.invoiceAlerts = action.payload;
        }
    }
});

export const { setLoading, setTenantAlerts, setOwnerAlerts, setInvoiceAlerts } = alertSlice.actions;

// Méthode qui récupère les alertes de suppression des locataires
export const fetchTenantAlerts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/alerts/tenants`);
        
        const data = response.data.member || response.data['hydra:member'] || response.data;
        
        dispatch(setTenantAlerts({
            warning: data[0] || [],
            absolute: data[1] || []
        }));
    } catch (error) {
        console.log(`Erreur fetchTenantAlerts : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

// Méthode qui récupère les alertes de suppression des propriétaires
export const fetchOwnerAlerts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/alerts/owners`);
        
        const data = response.data.member || response.data['hydra:member'] || response.data;
        dispatch(setOwnerAlerts(data));
    } catch (error) {
        console.log(`Erreur fetchOwnerAlerts : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

// Méthode qui récupère les alertes d'archivage des factures
export const fetchInvoiceAlerts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/alerts/invoices`);
        
        const data = response.data.member || response.data['hydra:member'] || response.data;
        dispatch(setInvoiceAlerts(data));
    } catch (error) {
        console.log(`Erreur fetchInvoiceAlerts : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

/**
 * Méthodes d'exécution d'archivage et de suppression (Anonymisation)
 */
export const archiveInvoice = (id, data) => async (dispatch) => {
    try {
        const response = await axios.patch(`${API_URL}/factures/${id}`, data, {
            headers: { "Content-Type": "application/merge-patch+json" }
        });
        dispatch(fetchInvoiceAlerts());
    } catch (error) {
        console.log(`Erreur archiveInvoice ID ${id} : ${error}`);
    }
};

export const purgeUser = (id) => async (dispatch) => {
    try {
        await axios.patch(`${API_URL}/users/${id}`, 
            { 
                name: "***", 
                lastname: "***" 
            }, 
            {
                headers: { "Content-Type": "application/merge-patch+json" }
            }
        );
        dispatch(fetchTenantAlerts());
        dispatch(fetchOwnerAlerts());
    } catch (error) {
        console.log(`Erreur purgeUser : ${error}`);
    }
};

export default alertSlice.reducer;