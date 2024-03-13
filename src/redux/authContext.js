import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  authToken: null,
  userDetails: null,
};

const authContext = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    userDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { updateAuthToken, updateUser,userDetails } = authContext.actions;

export default authContext.reducer