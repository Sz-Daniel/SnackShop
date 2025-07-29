// routes/admin.js
// schemas/productSchema.js

//Szerapált schéma, függően melyiknek melyik részét használjuk
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
          .send({ message: 'Hiba történt a termék létrehozása közben' });
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
            .send({ message: 'Nem található ilyen termék' });
        }

        reply.send({ status: 'ok' });
      } catch (err) {
        fastify.log.error(err);
        reply
          .status(500)
          .send({ message: 'Hiba történt a termék módosítása közben' });
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
            .send({ message: 'Nem található ilyen termék' });
        }

        reply.send({ status: `id: ${id} törölve` });
      } catch (err) {
        fastify.log.error(err);
        reply.status(500).send({ message: 'Hiba történt a törlés során' });
      }
    }
  );

  // rendeléslista adminoknak
  fastify.get('/api/orders', async (request, reply) => {
    try {
      const response = await fastify.db.all(
        `SELECT
          o.id AS order_id,
          o.date AS order_date,
          u.name AS user_name,
          p.name AS product_name,
          oi.quantity,
          p.price,
          (oi.quantity * p.price) AS item_total
        FROM orders o
        JOIN users u ON o.userId = u.id
        JOIN order_items oi ON o.id = oi.orderId
        JOIN products p ON oi.productId = p.id
        ORDER BY o.id, p.name;
        `
      );

      reply.send(response);
    } catch (err) {
      fastify.log.error(err);
      reply
        .status(500)
        .send({ message: 'Hiba történt a rendelések lekérésekor' });
    }
  });

  fastify.get('/api/log', async (request, reply) => {
    const response = await fastify.db.all(
      "SELECT 'error' AS type, id, url, method, message, stack, time, requestId FROM error_logs UNION ALL SELECT 'response' AS type, id, url, method, NULL AS message, NULL AS stack, time, requestId FROM response_logs ORDER BY time DESC, type ASC;"
    );
    return { response };
  });
}
