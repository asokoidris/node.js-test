import server from './routes/index';
import keys from './config/keys';
import db from './config/db';
const Port = keys.PORT || 5000;

const startServer = async () => {
  try {
    await db();

    await server.listen(Port, () => {
      logger.info(`Server listening on port ${Port}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

startServer();
