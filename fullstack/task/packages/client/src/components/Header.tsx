import React from 'react';
import { Box, Typography } from '@mui/material';

const timeAgo = (iso: string) => {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m} min ago`;
    return `${Math.floor(m / 60)} h ago`;
};

interface Props {
    fetchedAt?: string;
}

export const Header: React.FC<Props> = ({ fetchedAt }) => {
    const [, tick] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => tick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <Box mb={2}>
            <Typography variant="h4" component="h1" gutterBottom>
                Exchange Rates (CZK)
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
                Fetched {fetchedAt ? timeAgo(fetchedAt) : '—'}
            </Typography>
        </Box>
    );
};
