import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import InternshipListings from './pages/InternshipListings';
import UserManagement from './pages/UserManagement';
import Notifications from './pages/Notifications';
import MappingOversight from './pages/MappingOversight';
import ProgressTracking from './pages/ProgressTracking';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/internships" element={<InternshipListings />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mapping" element={<MappingOversight />} />
            <Route path="/progress" element={<ProgressTracking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
