import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextRequest } from 'next/server';
import type { Socket } from 'net';
import { setSocketIO } from '../../../lib/get-socket';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

let io: SocketIOServer;

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    // In development, we need to get the server instance from the global object
    if (!(global as any).io) {
      const httpServer = new NetServer();
      io = new SocketIOServer(httpServer, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });
      (global as any).io = io;
      setSocketIO(io);

      io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('message', (message) => {
          socket.emit('message', message);
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });

      httpServer.listen(3001);
    } else {
      io = (global as any).io;
    }
  }

  return new Response('Socket.io server running', { status: 200 });
}
