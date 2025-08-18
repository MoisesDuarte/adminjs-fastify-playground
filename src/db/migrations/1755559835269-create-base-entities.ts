import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBaseEntities1755559835269 implements MigrationInterface {
    name = 'CreateBaseEntities1755559835269';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "accounts" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          "deleted_at" TIMESTAMP NOT NULL DEFAULT now(),
          "events" json,
          "status" character varying NOT NULL DEFAULT 'PENDING',
          "name" character varying NOT NULL,
          "tax_number" character varying NOT NULL,
          "bank" character varying NOT NULL,
          "number" character varying NOT NULL,
          "branch" character varying NOT NULL,
          "balance" bigint NOT NULL DEFAULT '0',
          CONSTRAINT "CHK_870dc3641dee89344beaa14177" CHECK (status IN ('PENDING', 'ACTIVE', 'INACTIVE', 'BLOCKED')),
          CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
        )
      `);

      await queryRunner.query(`
        CREATE TABLE "compliances" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          "deleted_at" TIMESTAMP NOT NULL DEFAULT now(),
          "events" json,
          "status" character varying NOT NULL DEFAULT 'PENDING',
          "scheduled_at" TIMESTAMP NOT NULL,
          "result" jsonb,
          "account_id" uuid,
          CONSTRAINT "CHK_a66b0a255a7fd374e1287d2c76" CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
          CONSTRAINT "PK_26eed9c75edb11612ba2730e860" PRIMARY KEY ("id")
        );
        COMMENT ON COLUMN "compliances"."scheduled_at" IS 'Scheduled date for compliance to be processed';
      `);

      await queryRunner.query(`
        ALTER TABLE "compliances" ADD CONSTRAINT "FK_8339dd8dcb17491a511a0cb5092"
        FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "compliances" DROP CONSTRAINT "FK_8339dd8dcb17491a511a0cb5092"');
      await queryRunner.query('DROP TABLE "compliances"');
      await queryRunner.query('DROP TABLE "accounts"');
    }
}
