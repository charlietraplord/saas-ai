"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinChat: (agentId: string) => void;
  leaveChat: (agentId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinChat: () => {},
  leaveChat: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io('', {
      path: '/api/socketio',
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinChat = (agentId: string) => {
    if (socket) {
      socket.emit('join-chat', agentId);
    }
  };

  const leaveChat = (agentId: string) => {
    if (socket) {
      socket.emit('leave-chat', agentId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinChat, leaveChat }}>
      {children}
    </SocketContext.Provider>
  );
}
