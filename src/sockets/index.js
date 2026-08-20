const { Server } = require('socket.io');
const env = require('../config/env');
const User = require('../models/User');
const { verifyAccessToken } = require('../services/token.service');
const messageService = require('../services/message.service');

let io;

// ONLINE USERS TRACK KARNE KE LIYE (in-memory)
// Key: userId (string), Value: Set of socket.id (ek user ke multiple tabs ho sakte hain)
const onlineUsers = new Map();

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const authHeader = socket.handshake.headers?.authorization || '';
      const [scheme, headerToken] = authHeader.split(' ');
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token ||
        (scheme === 'Bearer' ? headerToken : null);

      if (!token) {
        return next(new Error('UNAUTHORIZED: Token nahi mila.'));
      }

      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.sub);

      if (!user) {
        return next(new Error('UNAUTHORIZED: User exist nahi karta.'));
      }

      socket.user = user;
      next();
    } catch (err) {
      next(new Error('UNAUTHORIZED: Invalid ya expired token.'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();

    console.log(`[socket] Naya connection: ${socket.id} (User: ${socket.user.name})`);

    // Is user ki apni "personal room" join kara do
    socket.join(`user:${userId}`);

    // ONLINE TRACK KARO
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
      // Ye user ka pehla connection hai - sabko batao ye online hua
      io.emit('user:online', { userId });
    }
    onlineUsers.get(userId).add(socket.id);

    // EVENT 1: sendMessage
    socket.on('sendMessage', async ({ conversationId, text }, callback) => {
      try {
        const message = await messageService.createMessage(conversationId, userId, text);

        // Conversation ke saare participants ko naya message bhejo
        io.to(`conversation:${conversationId}`).emit('newMessage', message);

        // Sender ko acknowledgement do (agar callback diya hai to)
        if (typeof callback === 'function') {
          callback({ success: true, message });
        }
      } catch (err) {
        if (typeof callback === 'function') {
          callback({ success: false, error: err.message });
        }
      }
    });

    // EVENT 2: joinConversation (message bhejne se pehle room join karna zaroori hai)
    socket.on('joinConversation', (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    // EVENT 3: typing
    socket.on('typing', ({ conversationId, isTyping }) => {
      socket.to(`conversation:${conversationId}`).emit('typing', {
        userId,
        isTyping
      });
    });

    // DISCONNECT - offline track karo
    socket.on('disconnect', () => {
      console.log(`[socket] Disconnect ho gaya: ${socket.id}`);

      const userSockets = onlineUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          // Iska koi aur tab/device connected nahi bacha - ab ye truly offline hai
          io.emit('user:offline', { userId });
        }
      }
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.IO abhi initialize nahi hua hai.');
  }
  return io;
}

module.exports = { initSocket, getIO };