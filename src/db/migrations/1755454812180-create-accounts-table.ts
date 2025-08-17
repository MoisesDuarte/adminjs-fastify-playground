import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountsTable1755454812180 implements MigrationInterface {
  name = 'Migrations1755454812180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "accounts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "bank" character varying NOT NULL,
        "number" character varying NOT NULL,
        "branch" character varying NOT NULL,
        "balance" bigint DEFAULT 0 NOT NULL,
        CONSTRAINT "PK_b482dad15becff9a89ad707dcbe" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "account_entity"');
  }
}
