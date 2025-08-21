import { Queue } from 'bullmq';

const complianceQueue = new Queue('compliance', {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export { complianceQueue };
