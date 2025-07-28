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

export default async function loggerHooks(fastify, opts) {
  fastify.addHook('onRequest', async (request, reply) => {
    const incomingId = request.headers['x-request-id'];
    request.requestId = incomingId || crypto.randomUUID();
  });

  fastify.addHook('onResponse', async (request, reply) => {
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
      fastify.log.error('Logolási hiba:', err);
    }
  });

  fastify.addHook('onError', async (request, reply, error) => {
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
      fastify.log.error('Hibalogolás sikertelen:', logError);
    }

    if (error.validation) {
      const errors = error.validation.map((e) => ({
        field: e.instancePath.replace(/^\//, ''), // pl. "/stock" -> "stock"
        message: e.message,
      }));
      reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validációs hiba',
        validation: error.validation,
      });
    } else {
      reply
        .status(error.statusCode || 500)
        .send({ error: error.message || 'Server Error' });
    }
  });
}
