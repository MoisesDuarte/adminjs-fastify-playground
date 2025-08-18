import { Column, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity } from 'typeorm';

/**
 * Base entity class that defines common columns that should be defined on all db entities.
 * It should be extended by all other entities.
 *
 * Common columns:
 * - `id`: A unique identifier for each entity. It's generated as a UUID and is the primary key.
 * - `createdAt`: The timestamp when the entity was created. It's automatically set to the current timestamp.
 * - `updatedAt`: The timestamp when the entity was last updated. It's automatically set to the current timestamp.
 * - `deletedAt`: The timestamp when the entity was soft deleted. It's automatically set to the current timestamp.
 */
export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;

  @Column({ type: 'json', nullable: true })
  events: {
    from: string;
    to: string,
    metadata: {
      user: string,
      reason: string
    }
  }[];
}
