import { Queue } from 'bullmq';
import { redisConnection } from '../connection.js';
import { EQueues } from '../enum/queues.enum.js';

export const complianceQueue = new Queue(EQueues.COMPLIANCE, {
  connection: redisConnection,
});
