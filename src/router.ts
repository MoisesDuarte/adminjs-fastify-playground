async function routes(fastify, options) {
  fastify.get('/', async (request, reply) => ({ hello: 'world' }));
}

export default routes;
