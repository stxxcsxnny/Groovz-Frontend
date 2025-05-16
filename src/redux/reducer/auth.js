import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { adminLogin, adminLogout, fetchAdmin } from "../thunks/admin";

const initialState = {
  user: null,
  isAdmin: false,
  loading: true,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExits: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userNotExists: (state) => {
      state.user = null;

      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.admin = action.payload.admin;
        state.loading = false;
        toast.success("Welcome, Admin!");
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        state.loading = false;
        toast.error(action.payload || "Login failed");
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdmin.rejected, (state) => {
        state.isAdmin = false;
        state.admin = null;
        state.loading = false;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        state.admin = null;
        toast.success(action.payload || "Logged out successfully");
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.payload);
      });
  },
});

export default authSlice;
export const { userExits, userNotExists } = authSlice.actions;
