import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRate1745651243865 implements MigrationInterface {
    name = 'exchangeRate1745651243865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rates" RENAME COLUMN "fetchedAt" TO "fetched_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rates" RENAME COLUMN "fetched_at" TO "fetchedAt"`);
    }

}
