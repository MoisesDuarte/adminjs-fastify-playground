import { DataSource } from 'typeorm';
import { getConfig } from './config.js';

export default new DataSource(getConfig());
