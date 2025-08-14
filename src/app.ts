import AdminJS from 'adminjs';
import Fastify from 'fastify';
import AdminJSFastify from '@adminjs/fastify';

const PORT = 3000;

const start = async () => {
  const app = Fastify();

  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [],
    databases: [],
  });

  await AdminJSFastify.buildRouter(
    admin,
    app,
  );

  app.listen({ port: PORT }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
    }
  });
};

start();
