// routes/auth.js
import bcrypt from 'bcrypt';
export default async function authRoutes(fastify, options) {
  //Register
  fastify.post('/api/register', async (request, reply) => {
    const { name, password } = request.body;

    if (!name || !password) {
      return reply.status(400).send({ error: 'Név és jelszó kötelező' });
    }

    const existsing = await fastify.db.get(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );
    if (existsing) {
      return reply.status(409).send({ error: 'Felhasználónév már létezik' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await fastify.db.run(
      'INSERT INTO users (name, passwordHash, isAdmin) VALUES (?, ?, ?)',
      [name, passwordHash, 0]
    );

    return reply.send({ success: true });
  });

  //Login
  fastify.post('/api/login', async (request, reply) => {
    if (!request.session) {
      return reply.status(500).send({ error: 'Session nem elérhető' });
    }
    const { name, password } = request.body;

    const user = await fastify.db.get('SELECT * FROM users WHERE name = ?', [
      name,
    ]);

    if (!user) {
      return reply
        .status(401)
        .send({ authenticated: false, message: 'Felhasználó nem található' });
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return reply
        .status(401)
        .send({ authenticated: false, message: 'Hibás jelszó' });
    }

    request.session.authenticated = true;
    request.session.userId = user.id;
    request.session.isAdmin = user.isAdmin;

    return {
      message: user.id,
      authenticated: true,
      isAdmin: !!user.isAdmin,
    };
  });
}
