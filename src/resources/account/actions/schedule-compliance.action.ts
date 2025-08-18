import { ActionResponse } from 'adminjs';
import getDbConnection from '@db/index.js';
import { Compliance } from 'src/resources/compliance/entity/compliance.entity.js';
import { addDays } from 'date-fns';
import logger from 'src/shared/logger/logger.js';

export default async (response: ActionResponse): Promise<ActionResponse> => {
  try {
    const { db } = await getDbConnection();

    const complianceRepo = db.getRepository(Compliance);

    await complianceRepo.save({
      account: { id: response.record.params.id },
      scheduledAt: addDays(new Date(), 2),
    });

    logger.info(`Compliance scheduled for account with id ${response.record.params.id}`);

    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
