import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import QuickstartPage from './pages/QuickstartPage';
import AuthenticationPage from './pages/AuthenticationPage';
import APIReferencePage from './pages/APIReferencePage';
import WebhooksPage from './pages/WebhooksPage';
import SDKsPage from './pages/SDKsPage';
import BestPracticesPage from './pages/BestPracticesPage';
import StatusPage from './pages/StatusPage';
import ChangelogPage from './pages/ChangelogPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/stellantis-api-docs">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quickstart" element={<QuickstartPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
            <Route path="/api-reference" element={<APIReferencePage />} />
            <Route path="/webhooks" element={<WebhooksPage />} />
            <Route path="/sdks" element={<SDKsPage />} />
            <Route path="/best-practices" element={<BestPracticesPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;