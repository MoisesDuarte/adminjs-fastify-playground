import { ResourceOptions } from 'adminjs';
import { baseNavigation } from 'src/shared/base/base.navigation.js';
import { ComplianceEntity } from './entity/compliance.entity.js';

export const ComplianceResource: { resource: typeof ComplianceEntity; options: ResourceOptions } = {
  resource: ComplianceEntity,
  options: {
    navigation: baseNavigation,
    actions: {
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
      edit: { isAccessible: false },
      new: { isAccessible: false },
    },
  },
};

export default ComplianceResource;
