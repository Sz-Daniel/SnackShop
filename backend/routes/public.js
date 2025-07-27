// routes/public.js

export default async function publicRoutes(fastify, options) {
  // termékek listázása minden felhasználónak
  fastify.get('/api/products', async (request, reply) => {
    const products = await fastify.db.all('SELECT * FROM products');
    return { products };
  });
}
