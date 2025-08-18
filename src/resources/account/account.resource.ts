import { ResourceOptions } from 'adminjs';
import { baseNavigation } from 'src/shared/base.navigation.js';
import { AccountEntity } from './entity/account.entity.js';
import scheduleComplianceAction from './actions/schedule-compliance.action.js';

const AccountResource: { resource: typeof AccountEntity; options: ResourceOptions } = {
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
