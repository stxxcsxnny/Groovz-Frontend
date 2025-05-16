// socket.js
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/SCONFIG";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // Initialize socket using useMemo to avoid re-initialization
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { getSocket, SocketProvider };
