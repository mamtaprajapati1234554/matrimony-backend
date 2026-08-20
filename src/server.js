const http = require('http');

const env = require('./config/env');
const connectDB = require('./config/db');
const app = require('./app');
const { initSocket } = require('./sockets');

async function start() {
  // Step 1: Pehle MongoDB se connect karo
  await connectDB();

  // Step 2: Express app ko ek raw HTTP server me wrap karo
  const httpServer = http.createServer(app);

  // Step 3: Socket.IO ko usi server pe attach karo
  initSocket(httpServer);

  // Step 4: Ab httpServer.listen() karo (app.listen() nahi)
  httpServer.listen(env.port, () => {
    console.log(`[server] Running in ${env.nodeEnv} mode on port ${env.port}`);
  });
}

start();