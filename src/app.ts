import AdminJS from 'adminjs';
import Fastify from 'fastify';
import AdminJSFastify from '@adminjs/fastify';
import { AccountEntity } from '@db/entities/account.entity.js';
import initializeDb from './db/index.js';

const PORT = 3000;
const HOST = '0.0.0.0';

const start = async () => {
  const app = Fastify();

  await initializeDb();

  const admin = new AdminJS({

    rootPath: '/admin',
    resources: [{
      resource: AccountEntity,
      options: {
        id: 'Accounts',
        navigation: {
          name: 'Transfers',
          icon: 'Home',
        },
      },
    }],
  });

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    console.debug('Debug | AdminJS running in development mode.');
    admin.watch();
  }

  await AdminJSFastify.buildRouter(
    admin,
    app,
  );

  app.listen({ port: PORT, host: HOST }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
    }
  });
};

start();
