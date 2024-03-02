import UserAuthService from '../../../../apps/auth/services/userAuthService';
import UserController from '../../../../apps/auth/controllers/userAuthController';
import { errorResponseMessage } from '../../../../utils/options';
import UserGenerator from '../../../generators/UserGenerator';
import logger from '../../mocks/logger';

describe('Authentication Controller', () => {
  describe('createUserAuthController', () => {
    it('should return success response when user is created successfully', async () => {
      const userData = await UserGenerator.generateRandomUser();
      const req = { body: userData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const expectedResult = {
        status: 'success',
        statusCode: 201,
        message: 'User created successfully',
        data: userData,
      };

      UserAuthService.createUserAuthService = jest
        .fn()
        .mockResolvedValue(expectedResult);

      await UserController.createUserAuthController(req, res);

      expect(UserAuthService.createUserAuthService).toHaveBeenCalledWith(
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('should return error response when user creation fails', async () => {
      const userData = await UserGenerator.generateRandomUser();
      const req = { body: userData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const expectedError = new Error('User creation failed');
      const expectedResult = {
        status: false,
        statusCode: 500,
        message: errorResponseMessage,
      };

      UserAuthService.createUserAuthService = jest
        .fn()
        .mockRejectedValue(expectedError);

      await UserController.createUserAuthController(req, res);

      expect(UserAuthService.createUserAuthService).toHaveBeenCalledWith(
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('loginUserAuthController', () => {
    it('should return success response when user is logged in successfully', async () => {
      const userData = await UserGenerator.generateRandomUser();
      const req = { body: userData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const expectedResult = {
        status: 'success',
        statusCode: 200,
        message: 'User logged in successfully',
        data: userData,
      };

      UserAuthService.loginUserAuthService = jest
        .fn()
        .mockResolvedValue(expectedResult);

      await UserController.loginUserAuthController(req, res);

      expect(UserAuthService.loginUserAuthService).toHaveBeenCalledWith(
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('should return error response when user login fails', async () => {
      const userData = await UserGenerator.generateRandomUser(); // Generate random user data
      const req = { body: userData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const expectedError = new Error('User login failed');
      const expectedResult = {
        status: false,
        statusCode: 500,
        message: errorResponseMessage,
      };

      UserAuthService.loginUserAuthService = jest
        .fn()
        .mockRejectedValue(expectedError);

      await UserController.loginUserAuthController(req, res);

      expect(UserAuthService.loginUserAuthService).toHaveBeenCalledWith(
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });
});
