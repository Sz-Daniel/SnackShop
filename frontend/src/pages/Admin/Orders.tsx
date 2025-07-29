import { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { OrderItem, useOrders } from '../../api/apiHooks';
import { Box, Typography } from '@mui/material';

export function Orders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const { data: ordersData, error: ordersError } = useOrders();

  useEffect(() => {
    console.log('Logs data fetched:', ordersData);
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);
  if (ordersError) {
    return (
      <Typography color="error">
        Hiba történt a megrendelések betöltésekor.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ m: 2 }}>
        Megrendelések
      </Typography>
      {orders.map((item, key) => (
        <Box key={key} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {new Date(item.order_date).toLocaleString()}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.user_name}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.product_name}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.quantity}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.price.toFixed(2)} Ft
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.item_total.toFixed(2)} Ft
          </Box>
        </Box>
      ))}
    </>
  );
}
