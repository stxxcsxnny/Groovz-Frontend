import { Backdrop, CircularProgress, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocketEvent } from '../../../hooks/hook';
import { INCOMING_RING, NEW_MESSAGE, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/event';
import { server } from '../../constants/SCONFIG';
import { getOrSaveFromStorage } from '../../lib/Features';
import { useMyChatsQuery } from '../../redux/api/api';
import { userNotExists } from '../../redux/reducer/auth';
import { IncrementNotificationCount, resetNotificationCount, setnewMessagesAlert } from '../../redux/reducer/chat';
import { setisDeleteMenu, setisNotification, setisSearch, setselectedDeleteChat } from '../../redux/reducer/misc';
import { getSocket } from '../../socket';
import '../CssStyles/appLayout.css';
import DeleteChatMenu from '../dialog/DeleteChatMenu';
import ChatList from '../specific/ChatList';
import IncomingBanner from '../dialog/IncomingBanner';

// Lazy imports
const Searchdialog = lazy(() => import('../specific/Searchdialog'));
const NewGroupdialog = lazy(() => import('../specific/NewGroupdialog'));
const NotificationDialog = lazy(() => import('../specific/NotificationDialog'));
const ProfileDrawer = lazy(() => import('../specific/Profile'));

const AppLayout = () => (WrappedComponent) => {

  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const deletemenuanchor = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();
    const { user } = useSelector((state) => state.auth);
    const { isSearch, isNotification } = useSelector((state) => state.misc);
    const { notificationCount } = useSelector((state) => state.chat);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, refetch } = useMyChatsQuery("");

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [incomingOffer, setIncomingOffer] = useState(null);

    const openSearchDialogue = () => dispatch(setisSearch(true));

    const navigateToGroup = () => navigate('/groups');

    const openNotification = () => {
      dispatch(setisNotification(true));
      dispatch(resetNotificationCount());
    };
    const toggleProfileDrawer = () => setIsProfileOpen((prev) => !prev);
    const openNewGroupHandler = () => setIsNewGroup((prev) => !prev)

    const logoutHandler = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
        dispatch(userNotExists());
        toast.success(data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE, value: newMessagesAlert })
    }, [newMessagesAlert])

    const handleDeleteChat = (e, _id, groupchat) => {
      dispatch(setselectedDeleteChat({ chatId: _id, groupchat }));
      dispatch(setisDeleteMenu(true));
      deletemenuanchor.current = e.currentTarget;
    };

    // Handler for new message alerts
    const newMessageAlertHandler = useCallback((data) => {
      if (data.chatId === chatId || data.senderId === user._id) return;
      dispatch(setnewMessagesAlert(data));
    }, [chatId, user]);

    const onlineUserListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const newRequsetAlertHandler = useCallback(() => {
      dispatch(IncrementNotificationCount());
      toast.success("New friend request received!");
    }, [dispatch]);

    const refetchHandler = useCallback(() => {
      refetch()
      navigate('/')
    }, [refetch, navigate]);
    useEffect(() => {
      if (!socket.connected) socket.connect();
    
      socket.on(INCOMING_RING, ({ fromSocketId, chatId, callerName, callerAvatar }) => {
        setIncomingOffer({ fromSocketId, chatId, callerName, callerAvatar });
      });
    
      return () => {
        socket.off(INCOMING_RING);
      };
    }, [socket]);
    
const handleAccept = () => {
  // redirect to video call page
  window.location.href = `/call/${incomingOffer.chatId}`;
  setIncomingOffer(null);
};

const handleDecline = () => {
  socket.emit('decline-call', {
    toSocketId: incomingOffer.fromSocketId,
    chatId: incomingOffer.chatId,
  });
  setIncomingOffer(null);
};

    const eventHandler = {
      [NEW_MESSAGE]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequsetAlertHandler,
      [REFETCH_CHATS]: refetchHandler,
      [ONLINE_USERS]: onlineUserListener
    };

    useSocketEvent(socket, eventHandler);

    return (
      <div className="Outer">
        <div className="mainContainer">
          {incomingOffer && (
            <IncomingBanner
              caller="Incoming call"
              onAccept={() => {
                navigate(`/chat/${incomingOffer.chatId}/v`);
                setIncomingOffer(null);
              }}
              onDecline={() => {
                socket.emit('decline-call', {
                  chatId: incomingOffer.chatId,
                  toSocketId: incomingOffer.fromSocketId
                });
                setIncomingOffer(null);
              }}
            />
          )}
          <div className="chatListContainer">
            <ChatList
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
            <DeleteChatMenu patch={dispatch} anchor={deletemenuanchor.current} />
          </div>

          <div className="chatContainer">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </div>

          <div className="profileContainer">
            <ul className="menu">
              <li>
                <input type="checkbox" id="toggle" />
                <label htmlFor="toggle">
                  <Tooltip title="Menu"><div></div></Tooltip>
                </label>
                <ul>
                  <li><Tooltip title="Search"><div className='search' onClick={openSearchDialogue}></div></Tooltip></li>
                  <li><Tooltip title="New Group"><div className='add-group' onClick={openNewGroupHandler}></div></Tooltip></li>
                  <li><Tooltip title="Manage Groups"><div className='Mgroup' onClick={navigateToGroup}></div></Tooltip></li>
                  <li>
                    <Tooltip title="Notifications">
                      <div className="notification-wrapper">
                        <div className="notification" onClick={openNotification}></div>
                        <div className="notification-badge">{notificationCount}</div>
                      </div>
                    </Tooltip>
                  </li>
                  <li><Tooltip title="My Profile"><div className='profile' onClick={toggleProfileDrawer}></div></Tooltip></li>
                  <li><Tooltip title="Logout"><div className='logout' onClick={logoutHandler}></div></Tooltip></li>
                </ul>
              </li>
            </ul>
          </div>

          <Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}>
            {isSearch && <Searchdialog />}
            {isNewGroup && <NewGroupdialog />}
            {isNotification && <NotificationDialog />}
            {isProfileOpen && <ProfileDrawer open={isProfileOpen} onClose={toggleProfileDrawer} />}
            {incomingOffer && (
        <IncomingBanner
          caller={incomingOffer.callerName}
          avatar={incomingOffer.callerAvatar}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
          </Suspense>
        </div>

        <div className="footer">
          <ul>
            <li><Tooltip title="Search"><div className='search' onClick={openSearchDialogue}></div></Tooltip></li>
            <li><Tooltip title="New Group"><div className='add-group' onClick={openNewGroupHandler}></div></Tooltip></li>
            <li><Tooltip title="Manage Groups"><div className='Mgroup' onClick={navigateToGroup}></div></Tooltip></li>
            <li>
              <Tooltip title="Notifications">
                <div className="notification-wrapper">
                  <div className="notification" onClick={openNotification}></div>
                  <div className="notification-badge">{notificationCount}</div>
                </div>
              </Tooltip>
            </li>
            <li><Tooltip title="My Profile"><div className='profile' onClick={toggleProfileDrawer}></div></Tooltip></li>
            <li><Tooltip title="Logout"><div className='logout' onClick={logoutHandler}></div></Tooltip></li>
          </ul>
        </div>
      </div>
    );
  };
};

export default AppLayout;
