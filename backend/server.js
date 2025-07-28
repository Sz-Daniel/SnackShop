//server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initDb } from './db/db.js';
import authRoutes from './routes/auth.js';
import sessionPlugin from './plugins/session.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import publicRoutes from './routes/public.js';
import devRoutes from './routes/dev.js';
import loggerHooks from './middleware/middleware.js';

const fastify = Fastify({
  logger: {
    genReqId: () => crypto.randomUUID(), // ez is működik
  },
});

await fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await fastify.register(sessionPlugin);

const db = await initDb();
fastify.decorate('db', db);

await fastify.register(loggerHooks);

await fastify.register(devRoutes);

await fastify.register(authRoutes);
await fastify.register(adminRoutes);
await fastify.register(userRoutes);
await fastify.register(publicRoutes);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
