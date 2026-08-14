const env = require('./config/env');
const connectDB = require('./config/db');
const app = require('./app');

async function start() {
  // Step 1: Pehle MongoDB se connect karo
  await connectDB();

  // Step 2: Phir Express server start karo
  app.listen(env.port, () => {
    console.log(`[server] Running in ${env.nodeEnv} mode on port ${env.port}`);
  });
}

start();