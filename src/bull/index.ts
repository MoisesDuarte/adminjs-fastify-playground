import { startComplianceWorker } from './workers/compliance.worker.js';

export const setupBullWorkers = () => {
  startComplianceWorker();
};
