import WebSocketService from '../../../../apps/webSocket/services/webSocketService';
import { startWebSocketServer } from '../../../../providers/websocketService';

jest.mock('../../../../providers/websocketService');

describe('WebSocketService', () => {
  describe('initWebSocketServer', () => {
    it('should initialize WebSocket server', () => {
      const mockServer = {};
      WebSocketService.initWebSocketServer(mockServer);

      expect(startWebSocketServer).toHaveBeenCalledWith(mockServer);
    });
  });
});
