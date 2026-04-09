import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        loading: false,
        currentBooking: null,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setCurrentBooking: (state, action) => { state.currentBooking = action.payload },
        setError: (state, action) => { state.error = action.payload },
    }
})

export const { setLoading, setCurrentBooking, setError } = bookingSlice.actions

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

export default bookingSlice.reducer;