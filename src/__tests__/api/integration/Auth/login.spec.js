import mongoose from 'mongoose';
import { requester } from '../../setup';
import UserSeeder from '../../../seeder/createUser';
import WebSocket from 'ws';

describe('Login Endpoint', () => {
  const endpoint = '/auth/login';

  beforeEach(async () => {
    await mongoose.connection.collection('User').deleteMany({});
  });

  it('should return success response when user logs in successfully', async () => {
    const generatedUsers = await UserSeeder.generateRandomUser(1);
    const userData = generatedUsers[0];

    const response = await requester.post(endpoint).send({
      email: userData.email,
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User logged in successfully');
    expect(response.body.data.user).toBeDefined();
    expect(response.body.data.user.email).toBe(userData.email);
    expect(response.body.data.user.username).toBe(userData.username);
    expect(response.body.data.user.password).toBeUndefined();
    expect(response.body.data.accessToken).toBeDefined();
  });

  it('should return error response when invalid credentials are provided', async () => {
    await UserSeeder.generateRandomUser(1);

    const response = await requester.post(endpoint).send({
      email: 'invalid@example.com',
      password: 'invalidpassword',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Invalid Credentials');
  });
});
