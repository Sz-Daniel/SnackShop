import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

import {
  AdminProductList,
  ProductList,
  PublicProductList,
  UserProductList,
} from '../pages/Product/ProductList';
import { Login } from '../pages/Auth/Login';
import { Cart } from '../pages/User/Cart';
import { Orders } from '../pages/Admin/Orders';
import { Logs } from '../pages/Admin/Logs';
import { Registration } from '../pages/Auth/Registration';
import { Layout } from '../pages/Layout/Layout';

export function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <RoleRoutes />
      </BrowserRouter>
    </>
  );
}

function RoleRoutes() {
  const { session } = useSession();
  if (session.isAdmin && session.authenticated) {
    return <AdminRoutes />;
  } else if (session.authenticated) {
    return <UserRoutes />;
  } else {
    return <PublicRoutes />;
  }
}
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AdminProductList />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function UserRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<UserProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PublicProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
