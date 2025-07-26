export default async function devRoutes(fastify, options) {
  fastify.get('/api/allTable', async (request, reply) => {
    const tablesMeta = await fastify.db.all(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    const dbTables = [];
    for (const table of tablesMeta) {
      const db = await fastify.db.all(`SELECT * FROM ${table.name}`);
      dbTables.push({ name: table.name, data: db });
    }
    return { dbTables };
  });
  fastify.get('/api/createDummyProducts', async (request, reply) => {
    await fastify.db.run(
      "INSERT INTO products (name, stock, price) VALUES ('BBQ Chips', 100, 600), ('Salted Pretzels', 150, 450),('Cheddar Popcorn', 120, 550),('Spicy Nachos', 80, 700),('Honey Roasted Peanuts', 200, 500),('Cinnamon Apple Chips', 90, 650)"
    );
    reply.send({ status: 'ok' });
  });
  fastify.get('/api/deleteProducts', async (request, reply) => {
    await fastify.db.run(' DELETE FROM products');
    reply.send({ status: 'ok' });
  });

  fastify.get('/test', async (request, reply) => {
    reply.send({ hello: 'world' });
  });

  fastify.get('/api/health', async (request, reply) => {
    return { status: 'ok', message: 'Backend működik' };
  });
}
