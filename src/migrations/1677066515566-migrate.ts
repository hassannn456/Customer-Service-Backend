import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1677066515566 implements MigrationInterface {
    name = 'migrate1677066515566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "admin_users" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
