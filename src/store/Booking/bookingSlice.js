import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        loading: false,
        currentBooking: null,
        userBookings: [],
        allBookings: [],
        error: null,
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setCurrentBooking: (state, action) => { state.currentBooking = action.payload },
        setUserBookings: (state, action) => { state.userBookings = action.payload },
        setAllBookings: (state, action) => { state.allBookings = action.payload },
        setError: (state, action) => { state.error = action.payload },
        removeBooking: (state, action) => {
            state.userBookings = state.userBookings.filter(booking => booking.id !== action.payload);
        }
    }
})

export const { setLoading, setCurrentBooking, setUserBookings, setAllBookings, setError, removeBooking } = bookingSlice.actions

// Créer une réservation
export const createBooking = (productId, startDate, endDate, nbAdult, nbChildren) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        dispatch(setError(null))
        const response = await axios.post(`${API_URL}/bookings`, {
            productId,
            startDate,
            endDate,
            nbAdult,
            nbChildren,
        })
        dispatch(setCurrentBooking(response.data))
        return response.data
    } catch (error) {
        dispatch(setError("Erreur lors de la réservation."))
        console.log(`Erreur création booking : ${error}`)
    } finally {
        dispatch(setLoading(false))
    }
}

//Annuler une réservation
export const deleteBooking = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        dispatch(setLoading(true));
        await axios.delete(`${API_URL}/bookings/${id}`), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        dispatch(removeBooking(id));
    } catch (error) {
        dispatch(setError("Erreur lors de la suppression de la réservation."));
        console.error(`Erreur deleteBooking :`, error);
    } finally {
        dispatch(setLoading(false));
    }
};

// Réservations de l'user connecté
export const fetchBookingsByUser = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/bookings`, {
            params: {
                user: `/api/users/${userId}`,
                'products.type': 'hebergement'
            }
        });
        dispatch(setUserBookings(response.data.member));
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération des réservations."));
        console.log(`Erreur fetchBookingsByUser : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

// Toutes les réservations (admin)
export const fetchAllBookings = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${API_URL}/bookings`, {
            params: {
                'products.type': 'hebergement'
            }
        });
        dispatch(setAllBookings(response.data.member))
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération des réservations."))
        console.log(`Erreur fetchAllBookings : ${error}`)
    } finally {
        dispatch(setLoading(false))
    }
}

export default bookingSlice.reducer;