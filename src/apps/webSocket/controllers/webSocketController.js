import WebSocketService from '../services/webSocketService';
import { errorResponse, successResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/options';

/**
 * @description WebSocket Controller class.
 */
export default class WebSocketController {
  /**
   * @description Initialize WebSocket server.
   * @param {http.Server} server - HTTP server instance.
   * @returns {Object} - Response object
   */
  static async initWebSocketServer(server) {
    try {
      WebSocketService.initWebSocketServer(server);
      logger.info('WebSocket server started successfully');
    } catch (error) {
      logger.error(`initWebSocketServer -> error: ${error.message}`);
      throw error;
    }
  }
}
