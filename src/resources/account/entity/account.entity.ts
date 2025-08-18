import {
  Check,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from 'src/shared/base/base.entity.js';

import { Compliance } from 'src/resources/compliance/entity/compliance.entity.js';
import { EAccountStatus } from '../enums/account-status.enum.js';

@Entity('accounts')
export class Account extends BaseEntity {
  @Check(`status IN (${Object.values(EAccountStatus).map((s) => `'${s}'`).join(', ')})`)
  @Column({ type: 'varchar', default: EAccountStatus.PENDING })
  status: EAccountStatus;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  taxNumber: string;

  @Column({ type: 'varchar' })
  bank: string; // TODO: Change to bank relationship later

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar' })
  branch: string;

  @Column({ type: 'int8', default: 0 })
  balance: number;

  @OneToMany(() => Compliance, (compliance) => compliance.account)
  compliances: Compliance[];
}
