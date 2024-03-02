import { faker } from '@faker-js/faker';

class UserGenerator {
  /**
   * @description Generate a random user object data for testing
   * @returns {Object} - Random user object
   */
  static generateRandomUser() {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password',
    };
  }
}

export default UserGenerator;
