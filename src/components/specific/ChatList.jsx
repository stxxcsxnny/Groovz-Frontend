import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../shared/ChatItem';

const ChatList = ({
  chats = [],
  chatId,
  newMessagesAlert = [],
  handleDeleteChat,
  onlineUsers = [],
  onSelectChat = () => {},
}) => {

  
  
  return (
    <Stack width="100%" direction="column" overflow="auto" height="100%" sx={{ scrollbarWidth: 'none' }}>
      {chats?.map((data, index) => {
        const { avatar = '/default-avatar.png', name = 'Unknown', _id, groupChat, members = [] } = data;
        const newMessageAlert = newMessagesAlert.find((alert) => alert.chatId === _id) || { chatId: _id, count: 0 };
        const { count } = newMessageAlert;

        const isOnline = members.some((member) => onlineUsers.includes(member._id));
         // Log the result
        

        return (
          <div key={_id} onClick={() => onSelectChat({ avatar, name, _id, groupChat, members })}>
       <ChatItem
  index={index}
  sameSender={chatId === _id}
  newMessageAlert={newMessageAlert}
  isOnline={isOnline}  // Ensure this value is passed correctly
  avatar={avatar}
  name={name}
  _id={_id}
  groupChat={groupChat}
  members={members}
  handleDeleteChat={handleDeleteChat}
/>

          </div>
        );
      })}
    </Stack>
  );
};

export default ChatList;
