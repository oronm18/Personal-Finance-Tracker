import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { Switch, Button, useMediaQuery, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppLogo from '../../assets/logo.png';
import { handleNavigate } from '../../Utils';
import { createThemeColored } from './theme';
import { useThemeContext } from './ThemeContext';

interface LayoutProps {
  children: ReactNode;
  userId: string;
  setUserId: (userId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userId, setUserId }) => {
  const { darkMode, setDarkMode } = useThemeContext();
  const location = useLocation();

  const theme = createThemeColored(darkMode);

  useEffect(() => {
    // Save dark mode state to sessionStorage
    sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('darkMode', darkMode);
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const navigateToHome = () => {
    handleNavigate('/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    setUserId('');
    handleNavigate('/login');
  };

  const handleLogin = () => {
    handleNavigate('/login');
  };

  const handleSignup = () => {
    handleNavigate('/signup');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Top bar */}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: darkMode ? '#444' : '#f0f0f0',
            color: darkMode ? '#f0f0f0' : '#333',
            padding: '10px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          {/* Logo or app title */}
          <Button color="primary" onClick={navigateToHome}>
            <img src={AppLogo} alt="App Logo" style={{ height: '40px' }} />
          </Button>

          {/* Login and Dark Mode buttons */}
          
          <Box>
          {location.pathname !== '/login' ? (
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={'' === userId ? handleLogin : handleLogout}
              style={{ marginRight: '8px' }}
            >
              {'' === userId ? 'Login' : 'Logout'}
            </Button>
            ): 
            <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSignup}
            style={{ marginRight: '8px' }}
          >
            {'Sign Up'}
          </Button>}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleThemeChange}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Box style={{ marginTop: '80px', paddingTop: '5px' }}>{children}</Box>

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
              backgroundColor: darkMode ? '#f0f0f0' : '#333',
              color: darkMode ? '#333' : '#f0f0f0',
            }}
          >
            Back to Home
          </Button>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
