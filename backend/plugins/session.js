//plugins//session.js
import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';

export default fp(async function (fastify, opts) {
  await fastify.register(fastifyCookie);
  await fastify.register(fastifySession, {
    secret: 'a very long secret string that should be at least 32 characters',
    cookie: { secure: false },
    saveUninitialized: false,
  });
});
