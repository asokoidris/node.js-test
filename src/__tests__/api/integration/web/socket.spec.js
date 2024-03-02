import mongoose from 'mongoose';
import WebSocket from 'ws';
import http from 'http';
import { requester } from '../../setup';
import UserSeeder from '../../../seeder/createUser';
import app from '../../../../routes/index';

describe('WebSocket Integration', () => {
  let server;
  let ws;
  let userData;

  jest.setTimeout(90000); // Increased timeout for the test suite

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(() => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      ws.close();
      done();
    });
  });

  beforeEach(async (done) => {
    await mongoose.connection.collection('User').deleteMany({});
    const generatedUsers = await UserSeeder.generateRandomUser(1);
    userData = generatedUsers[0];

    ws = new WebSocket(
      (ws = new WebSocket(`ws://localhost:8080/websocket/init`))
    );

    ws.on('open', () => {
      done();
    });
  }, 30);

  it('should receive login message when user logs in', (done) => {
    ws.on('message', (message) => {
      expect(message).toMatch(/.+\slogged in$/);
      done();
    });

    requester
      .post('/auth/login')
      .send({
        email: userData.email,
        password: 'password',
      })
      .expect(200)
      .end(() => {
        done();
      });
  });
});
