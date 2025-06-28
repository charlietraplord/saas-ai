import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiResponse } from 'next';
import { Socket } from 'net';

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

let cachedIO: SocketIOServer | null = null;

export function getSocketIO(): SocketIOServer | null {
  return cachedIO;
}

export function setSocketIO(io: SocketIOServer) {
  cachedIO = io;
}
