import { complianceQueue } from '../index.js';

const addCheckComplianceJob = async (id: string, scheduledAt: Date) => complianceQueue.add('check-compliance', { id }, {
  delay: scheduledAt.getTime() - Date.now(),
});

export { addCheckComplianceJob };
