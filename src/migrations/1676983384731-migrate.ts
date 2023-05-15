import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1676983384731 implements MigrationInterface {
    name = 'migrate1676983384731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_info" ("routing_number" SERIAL NOT NULL, "payment_network" character varying NOT NULL, "operator" character varying NOT NULL, "fi_name" character varying NOT NULL, CONSTRAINT "PK_119cf32436b8f94049a2606bd3b" PRIMARY KEY ("routing_number"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bank_info"`);
    }

}
