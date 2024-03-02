import WebSocket from 'ws';

let wss;

function startWebSocketServer(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      broadcastMessage(message);
    });
  });
}

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

/**
 * @description Broadcast login message to all connected clients.
 * @param {string} username - Username of the logged-in user.
 */
function broadcastLoginMessage(username) {
  const message = `${username} logged in`;
  broadcastMessage(message);
}

export { startWebSocketServer, broadcastLoginMessage };
