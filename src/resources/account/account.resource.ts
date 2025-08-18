import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import { Account } from './entity/account.entity.js';
import scheduleComplianceAction from './actions/schedule-compliance.action.js';

const AccountResource: IAdminJSResource<typeof Account> = {
  resource: Account,
  options: {
    navigation: null,
    editProperties: ['name', 'bank', 'number', 'branch', 'balance'],
    actions: {
      new: {
        after: [scheduleComplianceAction],
      },
    },
  },
};

export default AccountResource;
