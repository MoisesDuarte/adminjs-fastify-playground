import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const base = {
  type: 'postgres' as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  entities: ['src/**/*.entity.{j,t}s'],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all' as any,
  migrations: ['src/db/migrations/*.{j,t}s'],
  migrationsRun: true,
  subscribers: [],
  synchronize: false,
};

export const getConfig = (): PostgresConnectionOptions => {
  if (process.env.NODE_ENV === 'production') {
    return {
      ...base,
      migrationsRun: true,
    };
  }

  return {
    ...base,
    logging: true,
    logger: 'debug',
  };
};
