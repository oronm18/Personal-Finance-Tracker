import { createTheme } from '@material-ui/core/styles';

export const createThemeColored = (darkMode: boolean) => {
return createTheme({
    palette: {
        type: darkMode ? 'dark' : 'light',
    },
    typography: {
        h2: {
        color: darkMode ? '#f0f0f0' : '#333',
        },
        h4: {
        color: darkMode ? '#f0f0f0' : '#333',
        },
        h5: {
        color: darkMode ? '#f0f0f0' : '#333',
        },
        h6: {
        color: darkMode ? '#f0f0f0' : '#333',
        },
    },
    overrides: {
        MuiTable: {
        root: {
            backgroundColor: darkMode ? '#888' : '#f0f0f0',
        },
        },
        MuiTableCell: {
        root: {
            color: darkMode ? '#f0f0f0' : '#333',
        },
        },
        MuiTableHead: {
        root: {
            backgroundColor: darkMode ? '#666' : '#ccc',
        },
        },
        MuiTableRow: {
        root: {
            '&:hover': {
            backgroundColor: darkMode ? '#444' : '#ddd',
            },
        },
        },
        MuiTextField: {
        root: {
            color: darkMode ? '#f0f0f0' : '#333',
        },
        },
        MuiTableContainer: {
        root: {
            width: '100%',
        },
        },
        MuiButton: {
        root: {
            color: darkMode ? '#f0f0f0' : '#333',
            backgroundColor: darkMode ? '#333' : '#f0f0f0',
            '&:hover': {
            backgroundColor: darkMode ? '#444' : '#ddd',
              },
            }
          }
        },
      });    
    }