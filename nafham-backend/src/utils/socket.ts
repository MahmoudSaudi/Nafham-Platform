import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import prisma from './prisma';

let io: SocketIOServer;

export const initSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    // Join a specific support ticket room
    socket.on('join-ticket', (ticketId: string) => {
      socket.join(ticketId);
      console.log(`User ${socket.id} joined ticket room: ${ticketId}`);
    });

    // Handle sending messages within a ticket room
    socket.on('send-message', async (data: { ticketId: string; senderId: string; content: string; isFromAdmin: boolean }) => {
      try {
        // Save to DB
        const message = await prisma.ticketMessage.create({
          data: {
            ticketId: data.ticketId,
            senderId: data.senderId,
            content: data.content,
            isFromAdmin: data.isFromAdmin,
          },
          include: {
            sender: {
              select: { id: true, name: true, avatarUrl: true, role: true }
            }
          }
        });

        // Broadcast to everyone in the room
        io.to(data.ticketId).emit('receive-message', message);
      } catch (error) {
        console.error('Socket send-message error:', error);
      }
    });

    // Handle typing indicators
    socket.on('typing', (data: { ticketId: string; isTyping: boolean; userName: string }) => {
      socket.to(data.ticketId).emit('user-typing', data);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
