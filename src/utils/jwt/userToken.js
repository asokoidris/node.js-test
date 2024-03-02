import jwt from 'jsonwebtoken';
import keys from '../../config/keys.js';
import UserModel from '../../models/user.js';

/**
 * @description - This is a class that generates and verifies tokens
 */
export default class UserToken {
  /**
   * @description - This method is used to generate a token
   * @param {object} payload - The payload to be signed
   * @returns {string} - Returns a string
   * @memberof Token
   */
  static userGenerateToken(user) {
    const payload = {
      subject: user._id,
      email: user.email,
    };

    const options = {
      expiresIn: '1d',
    };
    try {
      const token = jwt.sign(payload, keys.JWT.SECRET, options);
      logger.info('token Successfully created');
      return token;
    } catch (err) {
      logger.error(`Error generating token ${JSON.stringify(err)}`);
      throw new Error(err.message);
    }
  }

  /**
   * @description - This method is used to generate a admin token
   * @param {string} token - The token is to be generated
   * @returns {object} - Returns an object
   * @memberof Token
   */

  static async generateUserAccessSecretKey(user) {
    const payload = {
      id: user._id || user.id,
      email: user.email,
    };
    const options = {
      expiresIn: keys.JWT.EXPIRES,
    };
    const token = await jwt.sign(payload, keys.JWT.SECRET, options);
    return token;
  }

  /**
   * @description - This method is used to verify a token
   * @param {string} token - The token to be verified
   * @returns {object} - Returns an object
   * @memberof Token
   */
  static decodeToken(token) {
    try {
      const decoded = jwt.verify(token, keys.JWT.SECRET);
      logger.info('token Successfully verified');
      return decoded;
    } catch (err) {
      logger.error(`Error verifying token ${JSON.stringify(err)}`);
      throw new Error(err.message);
    }
  }

  static async verifyUserAccessSecretKey(userToken) {
    try {
      const { id } = await jwt.verify(userToken, keys.JWT.SECRET);

      const user = await UserModel.findById(id);

      if (!user)
        return {
          statusCode: 404,
          message: 'Unauthorized',
        };

      return {
        statusCode: 200,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}
