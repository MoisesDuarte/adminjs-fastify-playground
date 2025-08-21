import {
  ConnectionOptions, Queue, Worker,
} from 'bullmq';

const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const createQueue = (name: string) => new Queue(name, { connection });

export const setupQueueWorker = async (queueName: string) => new Worker(
  queueName,
  async (job) => ({ jobId: `This is the return value of job (${job.id})` }),
  { connection },
);
