import mongoose from 'mongoose';
import { requester } from '../../setup';
import UserSeeder from '../../../seeder/createUser';

describe('Signup Endpoint', () => {
  const endpoint = '/auth/signup';

  beforeEach(async () => {
    await mongoose.connection.collection('User').deleteMany({});
  });

  it('should return success response when user is signed up successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await requester.post(endpoint).send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.data.user).toBeDefined();
    expect(response.body.data.user.email).toBe(userData.email);
    expect(response.body.data.user.username).toBe(userData.username);
    expect(response.body.data.user.password).toBeUndefined();
  });

  it('should return error response when user already exists', async () => {
    const existingUser = await UserSeeder.generateRandomUser(1);

    const userData = {
      username: existingUser[0].username,
      email: existingUser[0].email,
      password: 'testpassword',
    };

    const response = await requester.post(endpoint).send(userData);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already registered');
  });

  it('should return error response when invalid data is provided', async () => {
    const userData = {
      username: 'testuser',
      email: 'invalidemail',
      password: 'testpassword',
    };

    const response = await requester.post(endpoint).send(userData);
    expect(response.status).toBe(400);
  });
});
