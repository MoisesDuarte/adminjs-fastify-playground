import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { DataSource } from 'typeorm';

AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
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

  return { db };
};

export default initialize;
