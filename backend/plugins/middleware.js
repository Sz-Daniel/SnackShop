//middleware/middleware.js
export async function isAuthenticated(request, reply) {
  if (!request.session || !request.session.authenticated) {
    return reply.status(401).send({ error: 'Nem vagy bejelentkezve' });
  }
}

export async function isAdmin(request, reply) {
  if (!request.session || !request.session.isAdmin) {
    return reply.status(403).send({ error: 'Nincs jogosultságod' });
  }
}
import fp from 'fastify-plugin';

async function loggerHooks(fastify, opts) {
  // Egyedi request ID hozzárendelés
  fastify.addHook('onRequest', async (request, reply) => {
    const incomingId = request.headers['x-request-id'];
    request.requestId = incomingId || crypto.randomUUID();
  });

  // Response logolás
  fastify.addHook('onResponse', async (request, reply) => {
    console.log('--- LOGGING RESPONSE ---');

    try {
      await fastify.db.run(
        `INSERT INTO response_logs (url, status, method, success, time, requestId)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          request.raw.url,
          reply.statusCode,
          request.raw.method,
          reply.statusCode < 400 ? 1 : 0,
          new Date().toISOString(),
          request.requestId ?? null,
        ]
      );
    } catch (err) {
      fastify.log.error('Logolási hiba (response):', err);
    }
  });

  // Error logolás
  fastify.addHook('onError', async (request, reply, error) => {
    console.log('--- LOGGING ERROR ---');

    try {
      await fastify.db.run(
        `INSERT INTO error_logs (url, method, message, stack, time, requestId)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          request.raw.url,
          request.raw.method,
          error.message,
          error.stack,
          new Date().toISOString(),
          request.requestId ?? null,
        ]
      );
    } catch (logError) {
      fastify.log.error('Hibalogolás sikertelen (onError):', logError);
    }
  });
}

// Plugin wrapper kötelező, hogy elérje a `fastify.db`-t
export default fp(loggerHooks);
