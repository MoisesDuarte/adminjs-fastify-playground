import { ActionRequest, Before, ResourceOptions } from 'adminjs';
import { AccountEntity } from './entity/account.entity.js';

const AccountResource: { resource: typeof AccountEntity; options: ResourceOptions } = {
  resource: AccountEntity,
  options: {
    id: 'Accounts',
    // TODO: Create base resource to be extended from the navigation
    navigation: {
      name: 'Transfers',
      icon: 'Home',
    },
    editProperties: ['name', 'bank', 'number', 'branch', 'balance'],
    actions: {
      new: {
        before: (async (request: ActionRequest) => {
          console.log(request);

          // TODO: Create a handler for the account to be status checked
          // TODO: Create a fake bank validator api mock using i18n

          return request;
        }) as unknown as Before, // TODO: Check for a fix to this
      },
    },
  },
};

export default AccountResource;
