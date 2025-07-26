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
