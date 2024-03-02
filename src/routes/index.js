import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import WebSocket from 'ws';
import http from 'http';
import bodyParser from 'body-parser';
import Logger from '../config/logger';
import morgan from 'morgan';
import userAuthRoute from '../apps/auth/routes/userAuthRoute';
import WebSocketService from '../apps/webSocket/services/webSocketService';
import webSocketRoutes from '../apps/webSocket/routes/webSocketRoute';

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
WebSocketService.initWebSocketServer(server);

app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

global.logger = Logger.createLogger({ label: 'Nodejs-test Backend' });

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

// ## AUTH ROUTE ##
app.use('/auth', userAuthRoute);
app.use('/websocket', webSocketRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Node.js-test Backend is online and healthy techies');
});

export default server;
