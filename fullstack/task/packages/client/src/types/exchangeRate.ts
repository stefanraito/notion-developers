export interface Rate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
    fetchedAt: string;
}

export interface GetExchangeRatesData {
    exchangeRates: Rate[];
}
