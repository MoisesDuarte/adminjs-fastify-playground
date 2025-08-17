import {
  BaseEntity,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EAccountStatus } from '../enums/account-status.enum.js';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Check(`status IN (${Object.values(EAccountStatus).map((s) => `'${s}'`).join(', ')})`)
  @Column({ type: 'varchar', default: EAccountStatus.PENDING })
  status: EAccountStatus;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  bank: string; // TODO: Change to bank relationship later

  @Column({ type: 'varchar' })
  number: string;

  @Column({ type: 'varchar' })
  branch: string;

  @Column({ type: 'int8', default: 0 })
  balance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
