import { gql, useQuery } from '@apollo/client';
import { GetExchangeRatesData } from '../types/exchangeRate';

const GET_EXCHANGE_RATES = gql`
    query GetExchangeRates {
        exchangeRates {
            country
            currency
            amount
            code
            rate
            fetchedAt
        }
    }
`;

export function useExchangeRates() {
    return useQuery<GetExchangeRatesData>(GET_EXCHANGE_RATES, {
        pollInterval: 5 * 60_000, // refetch every 5 min
    });
}
