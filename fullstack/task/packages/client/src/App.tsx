import React from 'react';
import { Alert, CircularProgress, Container } from '@mui/material';
import { useExchangeRates } from './hooks/useExchangeRates';
import { Header } from './components/Header';
import { RefreshButton } from './components/RefreshButton';
import { ExchangeRatesTable } from './components/ExchangeRatesTable';

const App: React.FC = () => {
    const { loading, error, data, refetch } = useExchangeRates();
    const [lastFetchedAt, setLastFetchedAt] = React.useState<string>();

    React.useEffect(() => {
        const ts = data?.exchangeRates?.[0]?.fetchedAt;
        if (ts) setLastFetchedAt(ts);
    }, [data]);

    const handleRefresh = async () => {
        const res = await refetch();
        const ts = res.data?.exchangeRates?.[0]?.fetchedAt;
        if (ts) setLastFetchedAt(ts);
    };

    const rates = data?.exchangeRates ?? [];

    return (
        <Container
            maxWidth="md"
            sx={{
                py: 4,
                backgroundColor: 'background.paper',
                borderRadius: 2,
            }}
        >
            <Header fetchedAt={lastFetchedAt} />
            <RefreshButton onClick={handleRefresh} loading={loading} />

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error.message}</Alert>}

            {!loading && !error && <ExchangeRatesTable rates={rates} />}
        </Container>
    );
};

export default App;
