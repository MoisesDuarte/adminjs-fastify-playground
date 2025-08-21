import {
  ActionContext, ActionRequest, ActionResponse, RecordActionResponse,
} from 'adminjs';
import logger from 'src/shared/logger/logger.js';

export default async (
  response: RecordActionResponse,
  _: ActionRequest,
  context: ActionContext,
): Promise<ActionResponse> => {
  try {
    const { record, _admin } = context;

    if (record && record.isValid()) {
      logger.info(`Scheduling compliance for account with id ${record.id()}`);

      const complianceResource = _admin.findResource('Compliance');

      await complianceResource.create({
        account: { id: record.id() },
        scheduledAt: new Date(),
      });
    }

    return response;
  } catch (error) {
    logger.error(`Error scheduling compliance: ${error?.message}`);
    throw error;
  }
};
