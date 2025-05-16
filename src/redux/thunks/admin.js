import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/SCONFIG";

const adminLogin = createAsyncThunk( "admin/login", async (secretKey, thunkAPI) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const fetchAdmin = createAsyncThunk("admin/fetchAdmin", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/me`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const adminLogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/api/v1/admin/logout`,
        null,
        config
      ); // <-- `null` as data, `config` as 3rd param

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export { adminLogin, adminLogout, fetchAdmin };
