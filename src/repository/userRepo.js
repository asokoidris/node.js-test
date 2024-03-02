import UserModel from '../models/user';

/**
 * @fileOverview UserRepo class for user-related database operations.
 */
export default class UserRepo {
  /**
   * @description Create a new user in the database.
   * @param {Object} data - User data to be created.
   * @returns {Promise<Object>} A promise that resolves with the created user object.
   */
  static async createUser(data) {
    return UserModel.create(data);
  }

  /**
   * @description Find a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase() });
  }

  /**
   * @description Find a user by either email or username number.
   * @param {string} email - The email address to search for (optional).
   * @param {string} username - The username number to search for (optional).
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserByEmailOrUsername(email, username) {
    if (email) email = email.toLowerCase();
    if (username) username = username.toLowerCase();

    return UserModel.findOne({
      $or: [
        { email: { $ne: null, $eq: email } },
        { username: { $ne: null, $eq: username } },
      ],
    });
  }

  /**
   * @description Find a user by their unique ID and optionally populate related models.
   * @param {string} userId - The ID of the user to find.
   * @param {boolean} lean - Whether to return a plain JavaScript object instead of a Mongoose document.
   * @param {string[]} populate - An array of populate options for mongoose.
   * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
   */
  static async findUserById(userId) {
    try {
      return await UserModel.findById(userId);
    } catch (error) {
      logger.error(`UserRepo findUserById database -> error: ${error.message}`);
      throw error;
    }
  }
}
