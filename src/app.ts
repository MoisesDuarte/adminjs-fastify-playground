// Core libraries
import Fastify, { FastifyInstance } from 'fastify';
import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';
import { dark, light, noSidebar } from '@adminjs/themes';

// Internal
import { FastifyAdapter } from '@bull-board/fastify';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import logger from './shared/logger/logger.js';
import { componentLoader, Components } from './components/components.js';

// Database
import getDbConnection from './db/index.js';

// Resources
import AccountResource from './resources/account/account.resource.js';
import ComplianceResource from './resources/compliance/compliance.resource.js';

// Bull
import { complianceQueue } from './bull/queues/compliance.queue.js';
import { setupBullWorkers } from './bull/index.js';

const {
  PORT = 3000,
  HOST = '0.0.0.0',
  NODE_ENV,
} = process.env;

const setupBull = async (app: FastifyInstance) => {
  setupBullWorkers();

  const bullAdapter = new FastifyAdapter();

  createBullBoard({
    queues: [new BullMQAdapter(complianceQueue)],
    serverAdapter: bullAdapter,
  });

  bullAdapter.setBasePath('/queues');

  app.register(bullAdapter.registerPlugin(), {
    prefix: '/queues',
  });
};

const setupDatabase = async (app: FastifyInstance) => {
  try {
    await getDbConnection();
  } catch (err) {
    app.log.error(`Database initialization failed: ${err}`);
    process.exit(1);
  }
};

const setupAdminJs = async (app: FastifyInstance) => {
  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [AccountResource, ComplianceResource],
    componentLoader,
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    dashboard: {
      component: Components.Dashboard,
    },
  });

  if (NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    logger.debug('AdminJS running in development mode.');
    admin.watch();
  }

  await AdminJSFastify.buildRouter(admin, app);
};

const start = async () => {
  const app = Fastify({
    loggerInstance: logger,
    disableRequestLogging: true,
  });

  await setupBull(app);

  await setupDatabase(app);

  await setupAdminJs(app);

  try {
    await app.listen({ port: Number(PORT), host: HOST });
    logger.info(`AdminJS available at http://localhost:${PORT}/admin`);
  } catch (err) {
    logger.error(`Fastify failed to start: ${JSON.stringify(err)}`);
    process.exit(1);
  }
};

start();
