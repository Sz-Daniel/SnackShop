export default async function devRoutes(fastify, options) {
  // Check the db data
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

  // Create Dummy Products
  fastify.get('/api/resetDummyProducts', async (request, reply) => {
    await fastify.db.run(' DELETE FROM products');
    await fastify.db.run(
      `INSERT INTO products (name, stock, price) VALUES 
      ('BBQ Chips', 100, 600),
      ('Salted Pretzels', 150, 450),
      ('Cheddar Popcorn', 120, 550),
      ('Spicy Nachos', 80, 700),
      ('Honey Roasted Peanuts', 200, 500),
      ('Cinnamon Apple Chips', 90, 650)`
    );
    reply.send({ status: 'ok' });
  });

  //Dummy post to check data
  fastify.post('/api/dummyPost/:id', async (request, reply) => {
    reply.send({ request: request });
  });
  //Dummy delete to check data
  fastify.delete('/api/dummyDelete/:id', async (request, reply) => {
    reply.send({ request: request });
  });
  //Dummy put to check data
  fastify.put('/api/dummyPut/:id', async (request, reply) => {
    reply.send({ request: request });
  });
}
