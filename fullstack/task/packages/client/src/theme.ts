import { createTheme } from '@mui/material/styles';
import { blueGrey, deepOrange, grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blueGrey[700],
            contrastText: '#fff',
        },
        secondary: {
            main: deepOrange[500],
        },
        background: {
            default: grey[900],
            paper: grey[800],
        },
        text: {
            primary: '#fff',
            secondary: grey[400],
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: grey[700],
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});
