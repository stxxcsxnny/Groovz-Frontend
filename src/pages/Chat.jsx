import React, { useCallback, useRef, useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Divider, IconButton, Stack } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import MessegeComponent from '../components/shared/MessegeComponent';
import ChatHeaderCompo from '../components/shared/ChatHeaderCompo';
import { getSocket } from '../socket';
import { useChatDetailsQuery, useGetOldMessagesQuery } from '../redux/api/api';
import { CHAT_EXITED, CHAT_JOINED, NEW_MESSAGE_IN_SOCKET, START_TYPING, STOP_TYPING } from '../constants/event';
import { LayoutLoader, TypingLoader } from '../components/layout/Loaders';
import useErrors, { useSocketEvent } from '../../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setisFileMenu } from '../redux/reducer/misc';
import FileMenu from '../components/dialog/FileMenu';
import { removenewMessagesAlert } from '../redux/reducer/chat';
import { useNavigate } from 'react-router-dom';

const Chat = ({ chatId, user,  }) => {
  const containRef = useRef(null);
  const [message, setMessage] = useState('');
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const timeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessageschunk = useGetOldMessagesQuery({ chatId, page });

  const members = chatDetails?.data?.chat?.members || [];

  const {
    data: oldMessages,
    setData: setOldMessages,
  } = useInfiniteScrollTop(
    containRef,
    oldMessageschunk.data?.totalPages,
    page,
    setPage,
    oldMessageschunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageschunk.isError, error: oldMessageschunk.error },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE_IN_SOCKET, { messageStore: message, chatId, members });
    setMessage('');
  };

  const handleAttachements = (e) => {
    dispatch(setisFileMenu(true));
    setFileMenuAnchorEl(e.currentTarget);
  };

  const messageInputHandler = (e) => {
    setMessage(e.target.value);
  
    if (!IamTyping) {
      socket.emit(START_TYPING, {
        chatId,
        members,
        typingUserId: user._id, // ✅ Ensure this is sent
      });
  
      setIamTyping(true);
    }
  
    if (timeout.current) clearTimeout(timeout.current);
  
    timeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, {
        chatId,
        members,
        typingUserId: user._id, // ✅ Ensure this is sent
      });
  
      setIamTyping(false);
    }, 2000);
  };
  

  useEffect(() => {
    socket.emit(CHAT_JOINED,user._id)

    dispatch(removenewMessagesAlert(chatId));
    return () => {
      setMessage('');
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_EXITED, user._id);
      if (timeout.current) clearTimeout(timeout.current);
     
    };
  }, [chatId]);

  useEffect(() => {
    if (!chatDetails.isLoading && !chatDetails.data?.chat) {
      navigate('/');
    }
  }, [chatDetails.isLoading, chatDetails.data, navigate]);
  

  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((msg) => msg._id === data.message._id);
        if (messageExists) return prevMessages;
        return [...prevMessages, data.message];
      });
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      if (data.typingUserId === user._id) return; // Don't show if it's me

      setUserTyping(true);
    },
    [chatId, user._id]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      if (data.typingUserId === user._id) return;

      setUserTyping(false);
    },
    [chatId, user._id]
  );


  const eventHandler = {
    [NEW_MESSAGE_IN_SOCKET]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvent(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...(oldMessages || []).reverse(), ...Messages];

  useEffect(() => {
    if (containRef.current) {
      containRef.current.scrollTop = containRef.current.scrollHeight;
    }
  }, [allMessages]);

  return chatDetails.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
        <ChatHeaderCompo chatId={chatId}  />
           <Divider  />

      <Stack
        ref={containRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        height="83%"
        sx={{ overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        {allMessages.map((i) => (
          <MessegeComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div />
      </Stack>

      <form style={{ height: '7%' }} onSubmit={submitHandler}>
        <Stack
          direction="row"
          height="90%"
          width="90%"
          position="relative"
          marginLeft="5%"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '0.1px solid white',
            borderRadius: '30px',
          }}
        >
          <IconButton
            type="button"
            onClick={handleAttachements}
            sx={{ color: 'white', marginLeft: '1rem', padding: '0.4rem' }}
          >
            <AttachFile />
          </IconButton>

          <InputBox
            placeholder="Send message"
            value={message}
            onChange={messageInputHandler}
          />

          <IconButton component="button" type="submit" sx={{ margin: '1rem', padding: '0.5rem' }}>
            <Send sx={{ color: 'white', '&:hover': { color: '#2a64d1' } }} />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchorEl} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
