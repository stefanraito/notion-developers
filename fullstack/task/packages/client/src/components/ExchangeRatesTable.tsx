import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    useTheme,
} from '@mui/material';
import { Rate } from '../types/exchangeRate';

const StripedTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

interface Props {
    rates: Rate[];
}

export const ExchangeRatesTable: React.FC<Props> = ({ rates }) => {
    const theme = useTheme();

    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                height: '80vh',
                overflow: 'auto',
                mb: 4,
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {['Country', 'Currency', 'Amount', 'Code', 'Rate'].map((header) => (
                            <TableCell
                                key={header}
                                sx={{
                                    backgroundColor: theme.palette.grey[200],
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: '0.875rem',
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rates.map((r) => (
                        <StripedTableRow key={r.code}>
                            <TableCell sx={{ py: 1 }}>{r.country}</TableCell>
                            <TableCell sx={{ py: 1 }}>{r.currency}</TableCell>
                            <TableCell sx={{ py: 1, textAlign: 'right' }}>{r.amount}</TableCell>
                            <TableCell sx={{ py: 1 }}>{r.code}</TableCell>
                            <TableCell sx={{ py: 1, textAlign: 'right' }}>
                                {r.rate.toFixed(3)}
                            </TableCell>
                        </StripedTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
