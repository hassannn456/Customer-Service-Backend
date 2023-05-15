import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1676987315622 implements MigrationInterface {
    name = 'migrate1676987315622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nationalities" ("id" SERIAL NOT NULL, "country" character varying(60) NOT NULL, "country_code" character varying(3) NOT NULL, "created_at" TIMESTAMP NOT NULL, "un_code" character varying(3) NOT NULL, CONSTRAINT "PK_aaa94322d4f245f4fa3c3d591fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nationalities"`);
    }

}
