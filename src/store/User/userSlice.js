import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        owners: [],
        error: null,
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        setOwners: (state, action) => { state.owners = action.payload },
        setError: (state, action) => { state.error = action.payload },
    }
});

export const { setLoading, setOwners, setError } = userSlice.actions;

export const fetchOwners = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await axios.get(`${API_URL}/users`, {
            params: {
                isOwner: true
            }
        });
        dispatch(setOwners(response.data.member));
    } catch (error) {
        dispatch(setError("Erreur lors de la récupération des propriétaires."));
        console.error(`Erreur fetchOwners : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

export default userSlice.reducer;