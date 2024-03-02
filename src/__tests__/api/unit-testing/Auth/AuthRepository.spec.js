import UserRepo from '../../../../repository/userRepo';
import UserModel from '../../../../models/user';
import UserGenerator from '../../../generators/UserGenerator';
import logger from '../../mocks/logger';

jest.mock('../../../../models/user');

describe('UserRepo', () => {
  describe('createUser', () => {
    it('should create a new user in the database', async () => {
      const userData = await UserGenerator.generateRandomUser();
      const createdUser = { ...userData, _id: 'randomId123' };

      UserModel.create.mockResolvedValue(createdUser);

      const result = await UserRepo.createUser(userData);

      expect(result).toEqual(createdUser);
      expect(UserModel.create).toHaveBeenCalledWith(userData);
    });
  });

  describe('findUserByEmailOrUsername', () => {
    it('should find a user by either email or username', async () => {
      const email = 'test@example.com';
      const username = 'testuser';
      const user = {
        _id: 'userId123',
        email,
        username,
        password: 'testpassword',
      };

      UserModel.findOne.mockResolvedValue(user);

      const resultByEmail = await UserRepo.findUserByEmailOrUsername(email);
      const resultByUsername = await UserRepo.findUserByEmailOrUsername(
        null,
        username
      );

      expect(resultByEmail).toEqual(user);
      expect(resultByUsername).toEqual(user);
    });

    it('should return null if user is not found by email or username', async () => {
      const nonexistentEmail = 'nonexistent@example.com';
      const nonexistentUsername = 'nonexistentuser';

      UserModel.findOne.mockResolvedValue(null);

      const resultByEmail = await UserRepo.findUserByEmailOrUsername(
        nonexistentEmail
      );
      const resultByUsername = await UserRepo.findUserByEmailOrUsername(
        null,
        nonexistentUsername
      );

      expect(resultByEmail).toBeNull();
      expect(resultByUsername).toBeNull();
    });
  });

  describe('findUserById', () => {
    it('should find a user by their unique ID', async () => {
      const userId = 'userId123';
      const user = {
        _id: userId,
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword',
      };

      UserModel.findById.mockResolvedValue(user);

      const result = await UserRepo.findUserById(userId);

      expect(result).toEqual(user);
      expect(UserModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should return null if user is not found by ID', async () => {
      const nonexistentUserId = 'nonexistentId123';

      UserModel.findById.mockResolvedValue(null);

      const result = await UserRepo.findUserById(nonexistentUserId);

      expect(result).toBeNull();
      expect(UserModel.findById).toHaveBeenCalledWith(nonexistentUserId);
    });
  });
});
