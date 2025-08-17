import { before } from 'node:test';
import { AccountEntity } from './entity/account.entity.js';

export default {
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
      edit: {
        new: (request) => {
          console.log('new', request);
        },
      },
    },
  },
};
