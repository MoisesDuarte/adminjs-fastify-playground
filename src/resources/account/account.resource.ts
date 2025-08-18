import { baseNavigation } from 'src/shared/base/base.navigation.js';
import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import { AccountEntity } from './entity/account.entity.js';
import scheduleComplianceAction from './actions/schedule-compliance.action.js';

const AccountResource: IAdminJSResource<typeof AccountEntity> = {
  resource: AccountEntity,
  options: {
    navigation: baseNavigation,
    editProperties: ['name', 'bank', 'number', 'branch', 'balance'],
    actions: {
      new: {
        after: [scheduleComplianceAction],
      },
    },
  },
};

export default AccountResource;
