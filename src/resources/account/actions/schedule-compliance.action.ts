import { ActionResponse } from 'adminjs';
import getDbConnection from '@db/index.js';
import { ComplianceEntity } from 'src/resources/compliance/entity/compliance.entity.js';
import { addDays } from 'date-fns';

export default async (response: ActionResponse): Promise<ActionResponse> => {
  try {
    const { db } = await getDbConnection();

    const complianceRepo = db.getRepository(ComplianceEntity);

    await complianceRepo.save({
      account: { id: response.record.params.id },
      scheduledAt: addDays(new Date(), 2),
    });

    console.info(`Compliance scheduled for account with id ${response.record.params.id}`);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
