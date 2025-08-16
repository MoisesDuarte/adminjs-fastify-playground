import AdminJS from 'adminjs';
import Fastify from 'fastify';
import AdminJSFastify from '@adminjs/fastify';
import { Database, Resource } from '@adminjs/typeorm';
import { DataSource } from 'typeorm';

const PORT = 3000;
const HOST = '0.0.0.0';

const start = async () => {
  const app = Fastify();

  AdminJS.registerAdapter({ Database, Resource });

  const db = new DataSource({
    type: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PAYMENTS,
    host: process.env.DB_HOST,
    synchronize: false,
    entities: [],
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all',
    migrations: [],
    migrationsRun: false,
    subscribers: [],
  });

  await db.initialize();

  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [],
    databases: [],
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
