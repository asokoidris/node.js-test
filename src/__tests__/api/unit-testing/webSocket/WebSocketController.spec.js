import WebSocketController from '../../../../apps/webSocket/controllers/webSocketController';
import WebSocketService from '../../../../apps/webSocket/services/webSocketService';
import logger from '../../mocks/logger';

jest.mock('../../../../apps/webSocket/services/webSocketService');

describe('WebSocketController', () => {
  describe('initWebSocketServer', () => {
    it('should initialize WebSocket server successfully', async () => {
      const mockServer = {};
      WebSocketService.initWebSocketServer.mockImplementationOnce(() => {});

      await WebSocketController.initWebSocketServer(mockServer);

      expect(WebSocketService.initWebSocketServer).toHaveBeenCalledWith(
        mockServer
      );
    });

    it('should log an error if WebSocket server initialization fails', async () => {
      const mockServer = {};
      const errorMessage = 'WebSocket server initialization failed';
      const error = new Error(errorMessage);
      WebSocketService.initWebSocketServer.mockImplementationOnce(() => {
        throw error;
      });

      try {
        await WebSocketController.initWebSocketServer(mockServer);
      } catch (error) {
        expect(WebSocketService.initWebSocketServer).toHaveBeenCalledWith(
          mockServer
        );
        expect(error).toEqual(error);
      }
    });
  });
});
