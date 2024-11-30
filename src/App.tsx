import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BUNGALOV_IDS } from './config/bungalovs';
import BungalovDetail from './components/BungalovDetail/BungalovDetail';
import LandingPage from './components/LandingPage/LandingPage';
import Contact from './components/Contact/Contact';
import Terms from './components/Terms/Terms';
import Console from './components/Console/Console';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
    },
    secondary: {
      main: '#FFA000', // Amber
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bungalov" element={<LandingPage />} />
          <Route path="/bungalov/:id" element={<BungalovDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bungalov/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/bungalov/terms" element={<Terms />} />
          <Route path="/console" element={<Console />} />
          <Route path="*" element={<Navigate to={`/bungalov/${BUNGALOV_IDS.FIRST}`} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
