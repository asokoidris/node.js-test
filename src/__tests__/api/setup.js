import supertest from 'supertest';
import app from '../../routes/index';
import MongoConnection from '../../config/db';

const requester = supertest(app);

MongoConnection();

module.exports = {
  requester,
};
