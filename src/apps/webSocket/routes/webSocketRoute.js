import express from 'express';
import WebSocketController from '../controllers/webSocketController';

const router = express.Router();

router.post('/init', (req, res) => {
  const { server } = req;
  const response = WebSocketController.initWebSocketServer(server);
  return res.status(response.status).json(response);
});

export default router;
