import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExchangeRateEntity } from '../../entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
    private readonly CNB_URL =
        'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/daily.txt';

    constructor(
        @InjectRepository(ExchangeRateEntity)
        private readonly repo: Repository<ExchangeRateEntity>,
        private readonly http: HttpService
    ) {}

    public async getExchangeRates(): Promise<ExchangeRateEntity[]> {
        // Check most recent fetch
        const raw = await this.repo
            .createQueryBuilder('rate')
            .select('MAX(rate.fetchedAt)', 'max')
            .getRawOne<{ max: Date }>();

        const maxFetchedAt = raw?.max;
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        if (maxFetchedAt && maxFetchedAt > fiveMinutesAgo) {
            // read from DB cache
            return this.repo.find({ where: { fetchedAt: maxFetchedAt } });
        }

        const response = await firstValueFrom(
            this.http.get<string>(this.CNB_URL, { responseType: 'text' })
        );
        const lines = response.data.split('\n');
        // skip header (first two lines), then parse
        const entries = lines
            .slice(2)
            .filter((l) => l.trim())
            .map((line) => {
                const [country, currency, amt, code, rate] = line.split('|');
                return this.repo.create({
                    country,
                    currency,
                    amount: +amt,
                    code,
                    rate: parseFloat(rate),
                    fetchedAt: new Date(),
                });
            });

        // Replace old cache and save new
        await this.repo.manager.transaction(async (manager) => {
            await manager.clear(ExchangeRateEntity);
            await manager.save(entries);
        });

        // Return freshly saved
        const latestFetchedAt = entries[0].fetchedAt;
        return this.repo.find({ where: { fetchedAt: latestFetchedAt } });
    }
}
