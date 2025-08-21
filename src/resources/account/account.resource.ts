import { IAdminJSResource } from 'src/shared/interfaces/adminjs-resource.interface.js';
import { Components } from 'src/components/components.js';
import { Account } from './entity/account.entity.js';
import afterAction from './actions/after.action.js';

const AccountResource: IAdminJSResource<typeof Account> = {
  resource: Account,
  options: {
    navigation: null,
    editProperties: [
      'name',
      'taxNumber',
      'bank',
      'number',
      'branch',
      'balance',
    ],
    listProperties: [
      'createdAt',
      'updatedAt',
      'id',
      'name',
      'status',
    ],
    properties: {
      name: {
        type: 'string',
        isRequired: true,
        description: 'Name of the account holder',
      },
      status: {
        components: {
          list: Components.StatusBadge,
        },
      },
      taxNumber: {
        type: 'string',
        isRequired: true,
        description: 'CPF/CNPJ',
      },
      bank: {
        type: 'string',
        isRequired: true,
        description: 'Name of the bank',
        availableValues: [{
          value: 'John Banking S.A.',
          label: 'John Banking S.A.',
        }, {
          value: 'Forest Rain S.A.',
          label: 'Forest Rain S.A.',
        }, {
          value: 'Money to Burn S.A.',
          label: 'Money to Burn S.A.',
        }],
      },
      number: {
        type: 'string',
        isRequired: true,
        description: 'Account number',
      },
      branch: {
        type: 'number',
        isRequired: true,
        description: 'Branch code',
      },
      balance: {
        type: 'number',
        description: 'Account balance, defined as integer value, with 2 last digits representing cents',
      },
    },
    actions: {
      new: {
        after: afterAction,
      },
    },
  },
};

export default AccountResource;
