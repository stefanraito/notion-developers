import React from 'react';
import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    onClick: () => void;
    loading?: boolean;
}

export const RefreshButton: React.FC<Props> = ({ onClick, loading = false }) => (
    <LoadingButton
        variant="contained"
        loading={loading}
        loadingPosition="start"
        startIcon={<RefreshIcon />}
        onClick={onClick}
        sx={{ mb: 2 }}
    >
        Refresh
    </LoadingButton>
);
