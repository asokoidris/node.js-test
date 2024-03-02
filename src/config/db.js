import mongoose from 'mongoose';
import keys from './keys';

const getConnectionString = () => {
  switch (keys.NODE_ENV) {
    case 'production':
      return keys.DATABASE.PRODUCTION.CONNECTION_STRING;
    case 'staging':
      return keys.DATABASE.STAGING.CONNECTION_STRING;
    case 'test':
      return keys.DATABASE.TEST.CONNECTION_STRING;
    default:
      return keys.DATABASE.DEVELOPMENT.CONNECTION_STRING;
  }
};

const MongoConnection = async () => {
  try {
    const connectionString = getConnectionString();
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB!');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
};

export default MongoConnection;
