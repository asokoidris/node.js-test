import UserAuthService from '../../../../apps/auth/services/userAuthService';
import UserRepo from '../../../../repository/userRepo';
import HelperFunctions from '../../../../utils/helperFunctions';
import Token from '../../../../utils/jwt/userToken';
import logger from '../../mocks/logger';

// Mocking external dependencies
jest.mock('../../../../repository/userRepo');
jest.mock('../../../../utils/helperFunctions');
jest.mock('../../../../utils/jwt/userToken');

jest.mock('../../../../providers/websocketService', () => ({
  startWebSocketServer: jest.fn(),
  broadcastLoginMessage: jest.fn(),
}));

describe('UserAuthService', () => {
  describe('createUserAuthService', () => {
    it('should return success response when user is created successfully', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword',
      };
      const hashedPassword = 'hashedPassword';

      HelperFunctions.hashPassword.mockReturnValue(hashedPassword);
      UserRepo.findUserByEmail.mockResolvedValue(null);
      UserRepo.createUser.mockResolvedValue(userData);

      const expectedResult = {
        statusCode: 201,
        message: 'User created successfully',
        data: {
          user: { ...userData, password: undefined },
        },
      };

      const result = await UserAuthService.createUserAuthService(userData);

      expect(result).toEqual(expectedResult);
      expect(UserRepo.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(UserRepo.createUser).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
        email: userData.email.toLowerCase(),
      });
    });

    it('should return conflict response when user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword',
      };

      UserRepo.findUserByEmail.mockResolvedValue(userData);

      const expectedResult = {
        statusCode: 409,
        message: 'User already registered',
      };

      const result = await UserAuthService.createUserAuthService(userData);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('loginUserAuthService', () => {
    it('should return success response when user is logged in successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      const accessToken = 'accessToken';
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      UserRepo.findUserByEmailOrUsername.mockResolvedValue(user);
      HelperFunctions.comparePassword.mockResolvedValue(true);
      Token.userGenerateToken.mockReturnValue(accessToken);

      const expectedResult = {
        statusCode: 200,
        message: 'User logged in successfully',
        data: {
          user: { ...user, password: undefined },
          accessToken,
        },
      };

      const result = await UserAuthService.loginUserAuthService(userData);

      expect(result).toEqual(expectedResult);
      expect(UserRepo.findUserByEmailOrUsername).toHaveBeenCalledWith(
        userData.email,
        undefined
      );
      expect(Token.userGenerateToken).toHaveBeenCalledWith(user);
    });

    it('should return conflict response when user does not exist', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      UserRepo.findUserByEmailOrUsername.mockResolvedValue(null);

      const expectedResult = {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

      const result = await UserAuthService.loginUserAuthService(userData);

      expect(result).toEqual(expectedResult);
    });

    it('should return conflict response when password is incorrect', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      UserRepo.findUserByEmailOrUsername.mockResolvedValue(user);
      HelperFunctions.comparePassword.mockResolvedValue(false);

      const expectedResult = {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

      const result = await UserAuthService.loginUserAuthService(userData);

      expect(result).toEqual(expectedResult);
    });
  });
});
