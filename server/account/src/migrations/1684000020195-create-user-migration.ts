import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserMigration1684000020195 implements MigrationInterface {
  name = 'CreateUserMigration1684000020195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date, "updated_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP, "version" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "version" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
