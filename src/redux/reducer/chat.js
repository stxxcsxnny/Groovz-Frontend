import { createSlice } from "@reduxjs/toolkit";
import { NEW_MESSAGE } from "../../constants/event";
import { getOrSaveFromStorage } from "../../lib/Features";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    IncrementNotificationCount: (state, action) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state, action) => {
      state.notificationCount = 0;
    },

    setnewMessagesAlert: (state, action) => {
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },

    removenewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  IncrementNotificationCount,
  resetNotificationCount,
  setnewMessagesAlert,
  removenewMessagesAlert,
} = chatSlice.actions;
