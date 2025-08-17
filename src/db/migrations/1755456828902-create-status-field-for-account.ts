import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusFieldForAccount1755456828902 implements MigrationInterface {
  name = 'CreateStatusFieldForAccount1755456828902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "accounts" ADD "status" character varying DEFAULT \'PENDING\' NOT NULL');
    await queryRunner.query('ALTER TABLE "accounts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "accounts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "accounts" ADD "deletedAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "accounts" ADD CONSTRAINT "CHK_870dc3641dee89344beaa14177" CHECK (status IN (\'PENDING\', \'ACTIVE\', \'INACTIVE\', \'BLOCKED\'))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "accounts" DROP CONSTRAINT "CHK_870dc3641dee89344beaa14177"');
    await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "deletedAt"');
    await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "status"');
  }
}
