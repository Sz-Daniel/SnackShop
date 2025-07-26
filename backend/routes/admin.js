// routes/admin.js
export default async function adminRoutes(fastify, options) {
  // Admin jogosultság ellenőrzése minden route előtt
  /***
   * middlewareből!
 *   fastify.addHook('preHandler', async (request, reply) => {
    if (!request.session.authenticated || !request.session.isAdmin) {
      return reply.status(403).send({ error: 'Nincs jogosultságod' });
    }
  });

 */
  // új termék hozzáadása, adminoknak
  fastify.post('/api/products', async (request, reply) => {});
  // termék módosítása
  fastify.put('/api/products/:id', async (request, reply) => {});
  // termék törlése
  fastify.delete('/api/products/:id', async (request, reply) => {});
  // rendeléslista adminoknak
  fastify.get('/api/orders', async (request, reply) => {});
}
