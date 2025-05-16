// misc.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isaddMember: false,
  isNotification: false,
  isMobileMenuFriends: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: null,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setisNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
      console.log("misc", state.isNewGroup);
    },
    setisaddMember: (state, action) => {
      state.isaddMember = action.payload;
    },
    setisNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setisMobileMenuFriends: (state, action) => {
      state.isMobileMenuFriends = action.payload;
    },
    setisSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setisFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setisDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setuploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setselectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

// ✅ Fix the export: export only the reducer as default
export default miscSlice;

// ✅ Keep named exports for actions
export const {
  setisNewGroup,
  setisaddMember,
  setisNotification,
  setisMobileMenuFriends,
  setisSearch,
  setisFileMenu,
  setisDeleteMenu,
  setuploadingLoader,
  setselectedDeleteChat,
} = miscSlice.actions;
