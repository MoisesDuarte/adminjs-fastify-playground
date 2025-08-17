import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { DataSource } from 'typeorm';
import { getConfig } from './config.js';

AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
  const db = new DataSource(getConfig());

  await db.initialize();

  return { db };
};

export default initialize;
