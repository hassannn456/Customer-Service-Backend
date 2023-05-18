import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1677059772038 implements MigrationInterface {
    name = 'migrate1677059772038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin_users" ADD "updated_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "admin_users" DROP COLUMN "created_at"`);
    }

}
