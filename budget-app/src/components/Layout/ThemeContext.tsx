import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { ThemeProvider, Theme } from '@material-ui/core/styles';
import { createThemeColored } from './theme';

interface IThemeContext {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProviderComponent: React.FC<IThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedDarkMode = sessionStorage.getItem('darkMode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode) : prefersDarkMode;
  });

  const theme = createThemeColored(darkMode);

  useEffect(() => {
    sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProviderComponent');
  }
  return context;
};
