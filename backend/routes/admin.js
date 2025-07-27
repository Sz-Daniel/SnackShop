// routes/admin.js
export default async function adminRoutes(fastify, options) {
  /** Later
  fastify.addHook('preHandler', async (request, reply) => {
    if (!request.session.authenticated || !request.session.isAdmin) {
      return reply.status(403).send({ error: 'Nincs jogosultságod' });
    }
  });
 */
  // új termék hozzáadása, adminoknak
  fastify.post('/api/products', async (request, reply) => {});

  // termék módosítása
  fastify.put('/api/products/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, price, stock } = request.body;
    await fastify.db.run(
      'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
      [name, price, stock, id]
    );
    reply.send({ status: 'ok' });
  });

  // termék törlése
  fastify.delete('/api/products/:id', async (request, reply) => {
    const { id } = request.params;
    await fastify.db.run(`DELETE FROM products WHERE id = ?`, [id]);
    reply.send({ status: `id: ${id} törölve` });
  });

  // rendeléslista adminoknak
  fastify.get('/api/orders', async (request, reply) => {});
}
