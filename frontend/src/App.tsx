import { CartProvider } from './contexts/CartContext';
import { SessionProvider } from './contexts/SessionContext';
import { AppRoutes } from './routes/Routes';

import React from 'react';
function App() {
  return (
    <>
      <React.StrictMode>
        <CartProvider>
          <SessionProvider>
            <AppRoutes />
          </SessionProvider>
        </CartProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
