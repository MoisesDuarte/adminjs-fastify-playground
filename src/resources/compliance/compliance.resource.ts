import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import {
  ActionContext, ActionRequest, ActionResponse, RecordActionResponse,
} from 'adminjs';
import logger from 'src/shared/logger/logger.js';
import { Components } from 'src/components/components.js';
import { Compliance } from './entity/compliance.entity.js';

export const ComplianceResource: IAdminJSResource<typeof Compliance> = {
  resource: Compliance,
  options: {
    navigation: null,
    listProperties: [
      'createdAt',
      'updatedAt',
      'id',
      'status',
    ],
    properties: {
      status: {
        components: {
          list: Components.StatusBadge,
        },
      },
    },
    actions: {
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
      edit: { isAccessible: false },
      new: {
        isAccessible: false,
        after: async (
          response: RecordActionResponse,
          _: ActionRequest,
          context: ActionContext,
        ): Promise<ActionResponse> => {
          const { record } = context;

          if (record && record.isValid()) {
            logger.info(`Calling webhook for compliance with id ${record.id()}`);
            logger.info(`Record data: ${record.toJSON()}`);

            // TODO: Trigger n8n compliance webhook
          }

          return response;
        },
      },
    },
  },
};

export default ComplianceResource;
