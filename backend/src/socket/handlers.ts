import { Server } from 'socket.io';
import { logger } from '../utils/logger';

export const setupSocketHandlers = (io: Server): void => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Join conversation room
    socket.on('join-conversation', (conversationId: string) => {
      socket.join(`conversation-${conversationId}`);
      logger.info(`User ${socket.id} joined conversation ${conversationId}`);
    });

    // Handle chat messages
    socket.on('chat-message', async (data: { message: string; conversationId: string }) => {
      try {
        // Emit message to conversation room
        socket.to(`conversation-${data.conversationId}`).emit('new-message', {
          message: data.message,
          timestamp: new Date().toISOString(),
          sender: socket.id
        });

        // TODO: Process message through ML service and emit response
        // For now, just acknowledge receipt
        socket.emit('message-received', {
          success: true,
          messageId: Date.now().toString()
        });
      } catch (error) {
        socket.emit('error', {
          message: 'Error processing chat message'
        });
      }
    });

    // Handle file processing updates
    socket.on('file-processing-status', (data: { jobId: string; status: string }) => {
      socket.emit('processing-update', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });
};