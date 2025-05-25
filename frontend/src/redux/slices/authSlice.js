import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   token: localStorage.getItem("token") || null,
   isAuthenticated: !!localStorage.getItem("token"),
   loading: false,
   error: null,
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginStart: (state) => {
         state.loading = true;
         state.error = null;
      },
      loginSuccess: (state, action) => {
         state.loading = false;
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isAuthenticated = true;
         state.error = null;
      },
      loginFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      registerStart: (state) => {
         state.loading = true;
         state.error = null;
      },
      registerSuccess: (state, action) => {
         state.loading = false;
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isAuthenticated = true;
         state.error = null;
      },
      registerFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      logoutSuccess: (state) => {
         state.user = null;
         state.token = null;
         state.isAuthenticated = false;
      },
      profileUpdateSuccess: (state, action) => {
         state.user = action.payload;
      },
      clearError: (state) => {
         state.error = null;
      },
      setLoading: (state, action) => {
         state.loading = action.payload;
      },
      updateUserProfile: (state, action) => {
         if (state.user) {
            state.user = { ...state.user, ...action.payload };
         }
      },
   },
});

export const {
   loginStart,
   loginSuccess,
   loginFailure,
   registerStart,
   registerSuccess,
   registerFailure,
   logoutSuccess,
   profileUpdateSuccess,
   clearError,
   setLoading,
   updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
