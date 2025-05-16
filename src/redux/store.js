import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import authSlice from "./reducer/auth";
import chatSlice from "./reducer/chat";
import miscSlice from "./reducer/misc";

// Configure the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Directly use the slice reducer
    misc: miscSlice.reducer,
    chat: chatSlice.reducer,
    [api.reducerPath]: api.reducer, // Add API slice for caching and state management
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware, // Middleware to support API caching, etc.
  ],
});

export default store;
