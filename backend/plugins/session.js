//plugins//session.js
import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';

export default fp(async function (fastify, opts) {
  await fastify.register(fastifyCookie);
  await fastify.register(fastifySession, {
    secret: 'a very long secret string that should be at least 32 characters',
    cookie: {
      secure: false, // fejlesztői környezetben HTTP miatt false
      httpOnly: true,
      sameSite: 'lax', // vagy 'none' ha HTTPS, de nem ajánlom fejlesztői környezetben
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 nap
    },
    saveUninitialized: false,
    cookieName: 'sid', // opcionális, alapértelmezett is jó
  });
});
