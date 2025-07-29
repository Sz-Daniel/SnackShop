//Layout.tsx
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import {
  Box,
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';

import React from 'react';
import { Button } from '@mui/material';

type DarkModeToggleProps = {
  darkMode: boolean;
  onToggle: () => void;
};

export function DarkModeToggle({ darkMode, onToggle }: DarkModeToggleProps) {
  return (
    <Button onClick={onToggle} variant="outlined">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}

export function Layout() {
  const [darkMode, setDarkMode] = useState(true);

  const handleToggle = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#ffffff',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          minHeight="100vh"
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,

              width: '80%',
              boxSizing: 'border-box',
            }}
          >
            <Header darkMode={darkMode} onToggle={handleToggle} />
            <main>
              <Outlet />
            </main>
            <Footer />
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
}
