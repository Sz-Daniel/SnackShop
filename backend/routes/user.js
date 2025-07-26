// routes/user.js
export default async function userRoutes(fastify, options) {
  /** 
   * middlewareből!
 *   fastify.addHook('preHandler', async (request, reply) => {
    if (!request.session.authenticated) {
      return reply.status(403).send({ error: 'Nem vagy belépve' });
    }
  });
 */

  // rendelés leadása, felhasználóként
  fastify.post('/api/order', async (request, reply) => {});
}
