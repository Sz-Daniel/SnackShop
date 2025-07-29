// routes/auth.js
import bcrypt from 'bcrypt';

// Schema for user registration
const registerSchema = {
  body: {
    type: 'object',
    required: ['name', 'password'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 50 },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  },
};

// Authentication routes
export default async function authRoutes(fastify, options) {
  //Register
  fastify.post(
    '/api/register',
    { schema: registerSchema },
    async (request, reply) => {
      const { name, password } = request.body;

      const normalizedName = name.trim().toLowerCase();
      const existing = await fastify.db.get(
        'SELECT * FROM users WHERE LOWER(name) = ?',
        [normalizedName]
      );
      if (existing) {
        return reply
          .status(409)
          .send({ message: 'Felhasználónév már létezik' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      await fastify.db.run(
        'INSERT INTO users (name, passwordHash, isAdmin) VALUES (?, ?, ?)',
        [normalizedName, passwordHash, 0]
      );

      return reply.send({ success: true });
    }
  );
  //Login
  fastify.post('/api/login', async (request, reply) => {
    if (!request.session) {
      return reply.status(500).send({ message: 'Session nem elérhető' });
    }
    const { name, password } = request.body;

    const normalizedName = name.trim().toLowerCase();
    const user = await fastify.db.get(
      'SELECT * FROM users WHERE LOWER(name) = ?',
      [normalizedName]
    );

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
    request.session.userName = user.name;
    await request.session.save();
    fastify.log.info(`User ${user.name} logged in successfully`);

    return {
      userId: user.id,
      userName: user.name,
      authenticated: true,
      isAdmin: !!user.isAdmin,
    };
  });

  fastify.get('/api/session', async (request, reply) => {
    if (!request.session?.authenticated) {
      return reply.send({ authenticated: false });
    }

    return reply.send({
      authenticated: true,
      userId: request.session.userId,
      userName: request.session.userName,
      isAdmin: request.session.isAdmin,
    });
  });

  fastify.post('/api/logout', async (request, reply) => {
    if (request.session) {
      await new Promise((resolve, reject) => {
        request.session.destroy((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    reply.send({ success: true });
  });
}
