import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/SCONFIG";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (username) => ({
        url: `user/search?name=${username}`,

        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: `user/notification`,

        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) {
          url += "?populate=true";
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getOldMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,

        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    myGroups: builder.query({
      query: () => ({
        url: "chat/mychats/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: ({ chatId }) => {
        let url = "user/friends";
        if (chatId) {
          url += `?chatId=${chatId}`;
        }
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    newGroupapi: builder.mutation({
      query: ({ name, members }) => ({
        url: `chat/new`,
        method: "POST",
        body: JSON.stringify({ name, members }), // 👈 Serialize manually
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // 👈 Explicit content-type
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    RemoveGroupmember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        body: { chatId, userId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupmember: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        body: { members, chatId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    DeleteChat: builder.mutation({
      query: ({ chatId }) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    LeaveGroup: builder.mutation({
      query: ({ chatId }) => ({
        url: `chat/leavegroup/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: "admin/stats",
        credentials: "include", // 👈 Required if using cookies
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: "admin/users",
        credentials: "include", // 👈 Required if using cookies
      }),
    }),
    getChats: builder.query({
      query: () => ({
        url: "admin/chats",
        credentials: "include", // 👈 Required if using cookies
      }),
    }),
    getMessages: builder.query({
      query: () => ({
        url: "admin/messages",
        credentials: "include", // 👈 Required if using cookies
      }),
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetOldMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupapiMutation,
  useRenameGroupMutation,
  useRemoveGroupmemberMutation,
  useAddGroupmemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useGetDashboardStatsQuery,
  useGetUsersQuery,
  useGetChatsQuery,
  useGetMessagesQuery,
} = api;
