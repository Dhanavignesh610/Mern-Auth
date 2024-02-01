import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  empty: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
     state.loading = true, 
     state.empty = true;
    },
    signinClear: (state) => {
      state.loading = false,
         state.empty = false, state.error = false
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload,
        state.empty = false,
        state.loading = false,
        state.error = false
    },
    signinError: (state, action) => {
      state.loading = false,
       state.error = action.payload
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false,
        state.currentUser = action.payload,
        state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false, state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null,
      state.loading = false,
      state.error = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false,
       state.error = action.payload
    },
    signOut:(state)=>{
      state.currentUser = null,
      state.loading = false,    
      state.error = false;
    }
  },
});

export const {
  signinStart,
  signinClear,
  signinSuccess,
  signinError,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut
} = userSlice.actions;
export default userSlice.reducer;
