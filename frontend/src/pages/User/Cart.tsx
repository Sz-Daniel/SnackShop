import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import apiClient from '../../api/apiClient';
import { useCart } from '../../contexts/CartContext';
import { useSession } from '../../contexts/SessionContext';
import { useState } from 'react';

export function Cart() {
  const { items, addItem, removeItem, clearCart, totalItems, totalPrice } =
    useCart();
  const { session } = useSession();

  const [message, setMessage] = useState<string>('');
  const [orderedItems, setOrderedItems] = useState<any[]>([]);

  const orderSend = async () => {
    try {
      const response = await apiClient.post('/api/order', {
        userId: session.userId,
        cartItems: items,
      });

      const { message, cartItems } = response.data;

      setMessage(message || 'Sikeres rendelés.');
      setOrderedItems(cartItems || []);
      clearCart();
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || 'Hiba történt a rendelés során.';
      setMessage(msg);
      setOrderedItems([]);
    }
  };

  return (
    <Box sx={{ mx: 'auto', m: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Kosár
          </Typography>

          {items.length > 0 ? (
            <List>
              {items.map((item) => (
                <div key={item.product.id}>
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Delete
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={item.product.name}
                      secondary={`Quantity: ${item.quantity} - Price: ${item.product.price} Ft`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Your cart is empty</Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">All products: {totalItems}</Typography>
            <Typography variant="body1">
              Total Price: {totalPrice} Ft
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="primary">
              {message}
            </Typography>
          </Box>

          {orderedItems.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Ordered Products:</Typography>
              <List>
                {orderedItems.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`Quantity: ${item.quantity} - Price: ${item.product.price} Ft`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button variant="outlined" onClick={clearCart}>
            Empty Cart
          </Button>
          <Button
            variant="contained"
            onClick={orderSend}
            disabled={items.length === 0}
          >
            Send Order
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
