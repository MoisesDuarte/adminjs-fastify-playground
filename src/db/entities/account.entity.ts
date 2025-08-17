import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
