import axios from 'axios';
import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectRoute } from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './constants/SCONFIG';
import { userExits, userNotExists } from './redux/reducer/auth';
import { SocketProvider } from './socket';
import VideoCallRoom from './components/specific/video-call/videoCallRoom';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));

const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));

axios.defaults.withCredentials = true; 
const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then((res) => {

        dispatch(userExits(res.data.user));
      })
      .catch(() => {
        dispatch(userNotExists());
      });
  }, [dispatch]);

  if (loading) return <LayoutLoader />;

  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chat/:chatId/v" element={<VideoCallRoom/>} />

          </Route>

          <Route path='/login' element={<ProtectRoute user={!user} redirect='/'>
            <Login />
          </ProtectRoute>} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />



          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
