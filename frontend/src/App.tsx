import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import HomePage from './components/HomePage.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';
import ExpenseTracker from './components/ExpenseTracker.tsx';
import SpecializedTrackers from './components/SpecializedTrackers.tsx';
import Profile from './components/Profile.tsx';
import Notifications from './components/Notifications.tsx';
import MonthlyReport from './components/MonthlyReport.tsx';
import GoalsTracker from './components/GoalsTracker.tsx';
import Layout from './components/Layout.tsx';
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#38B2AC',
      700: '#2C7A7B',
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/expense-tracker" element={
            <ProtectedRoute>
              <Layout>
                <ExpenseTracker />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/specialized-trackers" element={
            <ProtectedRoute>
              <Layout>
                <SpecializedTrackers />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/monthly-report" element={
            <ProtectedRoute>
              <Layout>
                <MonthlyReport />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute>
              <Layout>
                <GoalsTracker />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

