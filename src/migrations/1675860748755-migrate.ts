import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1675860748755 implements MigrationInterface {
    name = 'migrate1675860748755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payees" ("id" SERIAL NOT NULL, "customer_id" character varying NOT NULL, "account_name" character varying(30), "account_number" character varying(16), "routing_number" character varying(11), "display_name" character varying(30), "book_image" character varying, "active" boolean, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, CONSTRAINT "PK_0d28f0868273a7328e0f13a423e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "roles" character varying NOT NULL, CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_users"`);
        await queryRunner.query(`DROP TABLE "payees"`);
    }

}
