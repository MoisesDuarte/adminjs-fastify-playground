import { Account } from 'src/resources/account/entity/account.entity.js';
import { BaseEntity } from 'src/shared/base/base.entity.js';
import {
  Check, Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { EComplianceStatus } from '../enums/compliance-status.enum.js';

@Entity({ name: 'compliances' })
export class Compliance extends BaseEntity {
  @Check(`status IN (${Object.values(EComplianceStatus).map((s) => `'${s}'`).join(', ')})`)
  @Column({ type: 'varchar', default: EComplianceStatus.PENDING })
  status: EComplianceStatus;

  @Column({ type: 'timestamp', comment: 'Scheduled date for compliance to be processed' })
  scheduledAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  result: any;

  @JoinColumn({ name: 'account_id', referencedColumnName: 'id' })
  @ManyToOne(() => Account, (account) => account.compliances)
  account: Account;
}
