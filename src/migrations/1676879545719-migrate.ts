import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1676879545719 implements MigrationInterface {
    name = 'migrate1676879545719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("customer_id" character varying NOT NULL, "company_id" character varying NOT NULL, "user_id" character varying NOT NULL, "device_id" character varying NOT NULL, "fname_th" character varying NOT NULL, "mname_th" character varying NOT NULL, "lname_th" character varying NOT NULL, "fullname_th" character varying NOT NULL, "fname_en" character varying NOT NULL, "mname_en" character varying NOT NULL, "lname_en" character varying NOT NULL, "fullname_en" character varying NOT NULL, "national_id" character varying NOT NULL, "passport" character varying NOT NULL, "laser_code" character varying NOT NULL, "dob" character varying NOT NULL, "issue_date" character varying NOT NULL, "expire_date" character varying NOT NULL, "image_card" character varying NOT NULL, "image_face" character varying NOT NULL, "dopa" character varying NOT NULL, "pin" character varying NOT NULL, "risk_factor" integer NOT NULL, "risk_reason" character varying NOT NULL, "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "wallet" character varying NOT NULL, "is_approved" boolean NOT NULL DEFAULT false, "pin_attempts" integer NOT NULL DEFAULT '0', "nationality" character varying NOT NULL, CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
