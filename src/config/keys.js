import dotenv from 'dotenv';
dotenv.config();

const keys = {
  DOMAIN: process.env.DOMAIN || `http://localhost:${process.env.PORT || 8080}`,
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BCRYPT: process.env.BCRYPT || 10,
  DATABASE: {
    DEVELOPMENT: {
      CONNECTION_STRING:
        process.env.LOCAL_DB || 'mongodb://localhost:27017/test',
    },
    PRODUCTION: {
      CONNECTION_STRING: process.env.PRODUCTION_DATABASE,
    },
    STAGING: {
      CONNECTION_STRING: process.env.STAGING_DATABASE,
    },
    TEST: {
      CONNECTION_STRING:
        process.env.TEST_DATABASE || 'mongodb://localhost:27017/test',
    },
  },
  JWT: {
    REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || '7d',
    SECRET: process.env.JWT_SECRET || 'secret',
    EXPIRES: process.env.JWT_EXPIRES || '7d',
    REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
  },
};

export default keys;
