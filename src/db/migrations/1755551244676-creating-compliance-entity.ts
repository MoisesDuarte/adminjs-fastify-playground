import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingComplianceEntity1755551244676 implements MigrationInterface {
    name = 'CreatingComplianceEntity1755551244676';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "compliance_entity" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "deletedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "events" json,
          "status" character varying NOT NULL DEFAULT 'PENDING',
          "scheduledAt" TIMESTAMP NOT NULL,
          "result" jsonb,
          "account_id" uuid,
          CONSTRAINT "CHK_b2c4f767e8a28e80923203b3c1" CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
          CONSTRAINT "PK_b785c85428c2581c7616c957233" PRIMARY KEY ("id")
        );
        COMMENT ON COLUMN "compliance_entity"."scheduledAt" IS 'Scheduled date for compliance to be processed'
      `);

      await queryRunner.query(`
        ALTER TABLE "accounts" ADD "events" json
      `);

      await queryRunner.query(`
        ALTER TABLE "compliance_entity" ADD CONSTRAINT "FK_f8dfd9af260fe98098d56e7252a"
          FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "compliance_entity" DROP CONSTRAINT "FK_f8dfd9af260fe98098d56e7252a"');
      await queryRunner.query('ALTER TABLE "accounts" DROP COLUMN "events"');
      await queryRunner.query('DROP TABLE "compliance_entity"');
    }
}
