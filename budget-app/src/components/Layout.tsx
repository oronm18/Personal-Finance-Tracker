import React, { useState, useEffect, ReactNode } from 'react';
import { Switch, Button, useMediaQuery } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppLogo from '../assets/logo.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = createTheme({
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
      
      h6: {
        color: darkMode ? '#f0f0f0' : '#333',
      },
    },
  });

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('darkMode', darkMode);
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: darkMode ? '#444' : '#f0f0f0',
            color: darkMode ? '#f0f0f0' : '#333',
            padding: '10px',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: 9999,
          }}
        >
          {/* Logo or app title */}
          <div>
            <Button color="primary" onClick={navigateToHome}>
              <img src={AppLogo} alt="App Logo" style={{ height: '40px' }} />
            </Button>
          </div>

          {/* Light Mode button */}
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleThemeChange}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ marginTop: '50px' }}>{children}</div>

        {/* Back to home button */}
        {location.pathname !== '/' && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="Back-button"
            onClick={navigateToHome}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 9999,
              backgroundColor: darkMode ? '#333' : '#f0f0f0',
              color: darkMode ? '#f0f0f0' : '#333',
            }}
          >
            Back to Home
          </Button>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
