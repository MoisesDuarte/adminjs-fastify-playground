import { Worker } from 'bullmq';
import logger from 'src/shared/logger/logger.js';
import { complianceQueue } from '../queues/compliance.queue.js';
import { redisConnection } from '../connection.js';
import { EComplianceQueueJobs } from '../enum/queues.enum.js';

export const startComplianceWorker = () => {
  const handlers: Record<string, () => Promise<void>> = {
    [EComplianceQueueJobs.CHECK_COMPLIANCE]: async () => {
      logger.info('Check compliance job executed');
    },
  };

  return new Worker(
    complianceQueue.name,
    async (job) => {
      const handler = handlers[job.name];

      if (!handler) {
        throw new Error(`No handler for job ${job.name}`);
      }
      return handler();
    },
    { connection: redisConnection },
  );
};
