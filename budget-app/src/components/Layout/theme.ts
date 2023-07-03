import { createTheme } from '@material-ui/core/styles';

export const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
    typography: {
      h2: {
        color: '#f0f0f0',
      },
      h4: {
        color: '#f0f0f0',
      },
      h5: {
        color: '#f0f0f0',
      },
    },
    overrides: {
      MuiTable: {
        root: {
          backgroundColor: '#888',
        },
      },
      MuiTableCell: {
        root: {
          color: '#f0f0f0',
        },
      },
      MuiTableHead: {
        root: {
          backgroundColor: '#666',
        },
      },
      MuiTableRow: {
        root: {
          '&:hover': {
            backgroundColor: '#444',
          },
        },
      },
      MuiTextField: {
        root: {
          color: '#f0f0f0',
        },
      },
      MuiTableContainer: {
        root: {
          width: '100%',
        },
      },
    },
  });

export const lightTheme = createTheme({
    palette: {
      type: 'light',
    },
    typography: {
      h2: {
        color: '#333',
      },
      h4: {
        color: '#333',
      },
      h5: {
        color: '#333',
      },
    },
    overrides: {
      MuiTable: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
      MuiTableCell: {
        root: {
          color: '#333',
        },
      },
      MuiTableHead: {
        root: {
          backgroundColor: '#ccc',
        },
      },
      MuiTableRow: {
        root: {
          '&:hover': {
            backgroundColor: '#ddd',
          },
        },
      },
      MuiTextField: {
        root: {
          color: '#333',
        },
      },
      MuiTableContainer: {
        root: {
          width: '100%',
        },
      },
    },
  });

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
        },
      });    
  }
  