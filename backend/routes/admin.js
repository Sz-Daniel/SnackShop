// routes/admin.js
// schemas/productSchema.js
const statusResponse = {
  200: {
    type: 'object',
    properties: {
      status: { type: 'string' },
    },
  },
};

const paramsRequirement = {
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 1 },
  },
  required: ['id'],
};

const bodyRequirement = {
  type: 'object',
  required: ['name', 'price', 'stock'],
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 50 },
    price: { type: 'number', minimum: 0, maximum: 10000 },
    stock: { type: 'integer', minimum: 0, maximum: 10000 },
  },
};

export default async function adminRoutes(fastify, options) {
  /** Later
  fastify.addHook('preHandler', async (request, reply) => {
    if (!request.session.authenticated || !request.session.isAdmin) {
      return reply.status(403).send({ error: 'Nincs jogosultságod' });
    }
  });
 */

  // új termék hozzáadása, adminoknak
  fastify.post(
    '/api/products',
    {
      schema: {
        body: bodyRequirement,
        response: statusResponse,
      },
    },
    async (request, reply) => {
      try {
        const { name, price, stock } = request.body;

        await fastify.db.run(
          `INSERT INTO products (name, stock, price) VALUES (?, ?, ?)`,
          [name, stock, price]
        );

        reply.send({ status: 'ok' });
      } catch (err) {
        fastify.log.error(err);
        reply
          .status(500)
          .send({ error: 'Hiba történt a termék létrehozása közben' });
      }
    }
  );
  // termék módosítása, adminoknak
  fastify.put(
    '/api/products/:id',
    {
      schema: {
        params: paramsRequirement,
        body: bodyRequirement,
        response: statusResponse,
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { name, price, stock } = request.body;

      try {
        const result = await fastify.db.run(
          'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
          [name, price, stock, id]
        );

        if (result.changes === 0) {
          return reply
            .status(404)
            .send({ error: 'Nem található ilyen termék' });
        }

        reply.send({ status: 'ok' });
      } catch (err) {
        fastify.log.error(err);
        reply
          .status(500)
          .send({ error: 'Hiba történt a termék módosítása közben' });
      }
    }
  );

  fastify.delete(
    '/api/products/:id',
    {
      schema: {
        params: paramsRequirement,

        response: statusResponse,
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        const result = await fastify.db.run(
          `DELETE FROM products WHERE id = ?`,
          [id]
        );

        if (result.changes === 0) {
          return reply
            .status(404)
            .send({ error: 'Nem található ilyen termék' });
        }

        reply.send({ status: `id: ${id} törölve` });
      } catch (err) {
        fastify.log.error(err);
        reply.status(500).send({ error: 'Hiba történt a törlés során' });
      }
    }
  );

  // rendeléslista adminoknak
  fastify.get('/api/orders', async (request, reply) => {});
}
