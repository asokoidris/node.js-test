import { startWebSocketServer } from '../../../providers/websocketService';

/**
 * @description WebSocket Service class.
 */
export default class WebSocketService {
  /**
   * @description Initialize WebSocket server.
   * @param {http.Server} server - HTTP server instance.
   */
  static initWebSocketServer(server) {
    startWebSocketServer(server);
  }
}
