import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateGQL } from './exchange-rate.model';

@Resolver(() => ExchangeRateGQL)
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => [ExchangeRateGQL], {
        description: 'List of latest exchange rates (cached 5 min)',
    })
    async exchangeRates(): Promise<ExchangeRateGQL[]> {
        return this.exchangeRateService.getExchangeRates();
    }
}
