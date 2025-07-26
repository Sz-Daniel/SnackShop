import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/Layout';
import { SPA } from '../pages/SPA';

export function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SPA />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

/**
 * 
 * @returns import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
          <Route index element={<ProductList />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
 */
