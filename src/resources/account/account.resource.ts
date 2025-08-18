import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import { baseNavigation } from 'src/shared/base/base.navigation.js';
import { Account } from './entity/account.entity.js';
import scheduleComplianceAction from './actions/schedule-compliance.action.js';

const AccountResource: IAdminJSResource<typeof Account> = {
  resource: Account,
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
