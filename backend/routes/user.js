// routes/user.js
export default async function userRoutes(fastify, options) {
  /**
  fastify.addHook('preHandler', async (request, reply) => {
    if (!request.session.authenticated) {
      return reply.status(403).send({ error: 'Nem vagy belépve' });
    }
  });
 */

  // rendelés leadása, felhasználóként

  fastify.post('/api/order', async (request, reply) => {
    const { userId, cartItems } = request.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return reply.status(400).send({ error: 'Hibás kosár adatok' });
    }

    const user = await fastify.db.get('SELECT * FROM users WHERE id = ?', [
      userId,
    ]);
    if (!user) {
      return reply.status(401).send({ message: 'Felhasználónév nem létezik' });
    }

    const productsInDb = await fastify.db.all('SELECT * FROM products');

    for (const cartItem of cartItems) {
      const product = cartItem.product;

      if (!product?.id || !cartItem.quantity) {
        fastify.log.error({ cartItem }, 'Hibás termék adat');
        return reply.status(402).send({ message: 'Hibás termék adatok' });
      }

      if (cartItem.quantity <= 0) {
        return reply
          .status(403)
          .send({ error: 'A mennyiségnek nagyobbnak kell lennie, mint 0' });
      }

      const matchedProduct = productsInDb.find((p) => p.id === product.id);
      if (!matchedProduct) {
        return reply.status(404).send({ message: 'Termék nem található' });
      }

      if (cartItem.quantity > matchedProduct.stock) {
        return reply
          .status(405)
          .send({ message: 'Nincs elég készleten a termékből' });
      }
    }

    const date = new Date().toISOString();
    const total = cartItems.reduce((sum, cartItem) => {
      const product = productsInDb.find((p) => p.id === cartItem.product.id);

      if (!product) {
        // Ez technikailag redundáns, de véd a hibás/módosított input ellen
        throw new Error(`A termék (id: ${cartItem.product.id}) nem található`);
      }

      return sum + product.price * cartItem.quantity;
    }, 0);
    const orderResult = await fastify.db.run(
      'INSERT INTO orders (userId, date, total) VALUES (?, ?, ?)',
      [userId, date, total]
    );

    const orderId = orderResult.lastID;

    const orderItems = cartItems.map((cartItem) => ({
      orderId,
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
    }));

    const orderItemInsertions = orderItems.map((item) =>
      fastify.db.run(
        'INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)',
        [item.orderId, item.productId, item.quantity]
      )
    );
    await Promise.all(orderItemInsertions);

    const stockUpdates = cartItems.map((cartItem) =>
      fastify.db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [
        cartItem.quantity,
        cartItem.product.id,
      ])
    );
    await Promise.all(stockUpdates);

    return reply.send({
      success: true,
      cartItems,
      message: 'Rendelés sikeresen leadva',
    });
  });
}
