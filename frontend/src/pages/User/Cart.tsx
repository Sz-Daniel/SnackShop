import apiClient from '../../api/apiClient';
import { useCart } from '../../contexts/CartContext';
import { useSession } from '../../contexts/SessionContext';

export function Cart() {
  const { items, addItem, removeItem, clearCart, totalItems, totalPrice } =
    useCart();
  const { session } = useSession();
  const orderSend = async () => {
    try {
      const response = await apiClient.post('/api/order', {
        userId: session.userId,
        cartItems: items,
      });
      console.log('Order sent successfully:', response.data);
      clearCart();
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Cart Page</h1>
        <p>This is where the cart items will be displayed.</p>
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.product.id}>
                {item.product.name} - Quantity: {item.quantity} - Price:{' '}
                {item.product.price} HUF
                <button onClick={() => removeItem(item.product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice} HUF</p>
        <button onClick={() => clearCart()}>Clear Cart</button>
        <button onClick={() => orderSend()}>Send order</button>
      </div>
    </>
  );
}
