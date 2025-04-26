import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRate1745651090862 implements MigrationInterface {
    name = 'exchangeRate1745651090862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rates" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "currency" character varying NOT NULL, "amount" integer NOT NULL, "code" character varying NOT NULL, "rate" numeric(12,4) NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
    }

}
