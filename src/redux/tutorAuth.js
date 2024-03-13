import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tutorDetails: null
}

const tutorAuth = createSlice({
    name: 'tutor',
    initialState,
    reducers: {
        updateTutor: (state, action) => {
            state.tutorDetails = action.payload
        }
    }
})

export const {updateTutor} = tutorAuth.actions

export default tutorAuth.reducer