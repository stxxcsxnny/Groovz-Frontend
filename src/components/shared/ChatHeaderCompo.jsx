// ChatHeaderCompo.js
import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { Call, VideoCallRounded, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMyChatsQuery } from "../../redux/api/api";
import AvatarCard from "./AvatarCard";
import ChatDetails from "./ChatDetails";

const ChatHeaderCompo = ({ chatId }) => {
  const navigate = useNavigate();
  const { isLoading, data } = useMyChatsQuery("");

  const [info, setInfo] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleInfo = () => {
    setInfo((prev) => !prev);
  };

  const handleVideoCall = () => {
    // Navigate to the video call room
    navigate(`/chat/${chatId}/v`);
  };

  if (isLoading) return null;

  const selectedChat = data?.chats?.find((chat) => chat._id === chatId);

  return (
    <Stack direction="row" height="10%" width="100%" justifyContent="space-between" alignItems="center" padding="10px">
      <Box display="flex" alignItems="center" gap="1rem" marginLeft="20px">
        <AvatarCard avatar={selectedChat?.avatar} />
        <Typography variant="subtitle1" color="white">
          {selectedChat?.name || "Select a chat"}
        </Typography>
      </Box>

      <Stack direction="row" marginRight="20px" alignItems="center">
        <Call style={{ color: "white", marginRight: "10px" }} />
        <VideoCallRounded
          onClick={handleVideoCall}
          style={{ color: "white", marginRight: "10px" }}
        />
        <IconButton onClick={handleInfo}>
          <InfoOutlined style={{ color: "white", marginRight: "10px" }} />
        </IconButton>
      </Stack>

      {info && <ChatDetails chatId={chatId} open={info} handleClose={handleInfo} />}
    </Stack>
  );
};

export default ChatHeaderCompo;
