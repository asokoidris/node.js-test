import UserGenerator from '../generators/UserGenerator';
import UserRepo from '../../repository/userRepo';
import HelperFunctions from '../../utils/helperFunctions';

class UserSeeder {
  /**
   * @description This method creates a new user
   * @returns {object} profile
   */
  static async generateRandomUser(number = 1) {
    const users = [];
    for (let i = 0; i < number; i++) {
      const createdUser = UserGenerator.generateRandomUser();
      const user = await UserRepo.createUser({
        username: createdUser.username.toLowerCase(),
        email: createdUser.email.toLowerCase(),
        password: HelperFunctions.hashPassword(createdUser.password),
      });
      users.push(user);
    }
    return users;
  }
}

export default UserSeeder;
