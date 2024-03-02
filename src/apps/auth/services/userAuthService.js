import UserRepo from '../../../repository/userRepo';
import HelperFunctions from '../../../utils/helperFunctions';
import Token from '../../../utils/jwt/userToken';
import {
  startWebSocketServer,
  broadcastLoginMessage,
} from '../../../providers/websocketService';

/**
 * @description Auth Service class
 */
export default class UserAuthService {
  /**
   * @description function to signup user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async createUserAuthService(data) {
    const { email, username, password } = data;

    const userExist = await UserRepo.findUserByEmail(email);

    if (userExist)
      return {
        statusCode: 409,
        message: 'User already registered',
      };

    const hashedPassword = HelperFunctions.hashPassword(password);

    const newUser = {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    const createNewUser = await UserRepo.createUser(newUser);

    createNewUser.password = undefined;

    logger.info(
      `createUserService -> info: User created with email: ${JSON.stringify(
        createNewUser
      )}`
    );

    return {
      statusCode: 201,
      message: 'User created successfully',
      data: {
        user: createNewUser,
      },
    };
  }

  /**
   * @description - This method is used to login a user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async loginUserAuthService(data) {
    const { email, password, username } = data;

    const user = await UserRepo.findUserByEmailOrUsername(email, username);

    if (!user)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await HelperFunctions.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const accessToken = Token.userGenerateToken(user);

    broadcastLoginMessage(user.username);

    user.password = undefined;

    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        user,
        accessToken,
      },
    };
  }
}
