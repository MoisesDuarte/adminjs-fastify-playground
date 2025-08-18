import { baseNavigation } from 'src/shared/base/base.navigation.js';
import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import { ComplianceEntity } from './entity/compliance.entity.js';

export const ComplianceResource: IAdminJSResource<typeof ComplianceEntity> = {
  resource: ComplianceEntity,
  options: {
    navigation: baseNavigation,
    actions: {
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
      edit: { isAccessible: false },
      new: { isAccessible: false },
      // TODO: Setup action that takes compliance and adds to a bull queue job scheduled at the defined date
    },
  },
};

export default ComplianceResource;
