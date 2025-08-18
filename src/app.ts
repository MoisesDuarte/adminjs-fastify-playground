// Core libraries
import Fastify from 'fastify';
import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';

// Internal libraries
import logger from './shared/logger.js';

// Database
import getDbConnection from './db/index.js';

// Resources
import AccountResource from './resources/account/account.resource.js';
import ComplianceResource from './resources/compliance/compliance.resource.js';

const {
  PORT = 3000,
  HOST = '0.0.0.0',
  NODE_ENV,
} = process.env;

const start = async () => {
  const app = Fastify({ loggerInstance: logger });

  try {
    await getDbConnection();
  } catch (err) {
    app.log.error(`Database initialization failed: ${err}`);
    process.exit(1);
  }

  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [AccountResource, ComplianceResource],
  });

  if (NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    logger.debug('Debug | AdminJS running in development mode.');
    admin.watch();
  }

  await AdminJSFastify.buildRouter(admin, app);

  try {
    await app.listen({ port: Number(PORT), host: HOST });
    logger.info(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
  } catch (err) {
    logger.error(`Fastify failed to start: ${JSON.stringify(err)}`);
    process.exit(1);
  }
};

start();
